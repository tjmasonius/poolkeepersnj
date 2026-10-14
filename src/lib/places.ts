import { NextResponse } from "next/server";

export type PlaceAddress = {
  line1: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
  lat: number | null;
  lng: number | null;
};

export type PlaceSuggestion = {
  placeId: string;
  text: string;
  mainText: string;
  secondaryText: string;
};

type AddressComponent = {
  longText?: string;
  shortText?: string;
  types?: string[];
};

/** ~80km box around Ocean/Monmouth NJ (circle radius max is 50km). */
const NJ_BIAS = {
  rectangle: {
    low: { latitude: 39.38, longitude: -75.14 },
    high: { latitude: 40.82, longitude: -73.26 },
  },
};

function mapsKey() {
  return (process.env.GOOGLE_MAPS_API_KEY || "").trim();
}

function component(
  components: AddressComponent[] | undefined,
  ...types: string[]
) {
  for (const type of types) {
    const hit = components?.find((c) => c.types?.includes(type));
    if (hit) return hit;
  }
  return undefined;
}

export function parseAddressComponents(
  components: AddressComponent[] | undefined,
  formattedAddress?: string,
  location?: { latitude?: number; longitude?: number },
): PlaceAddress {
  const streetNumber =
    component(components, "street_number")?.shortText ||
    component(components, "street_number")?.longText ||
    "";
  const route =
    component(components, "route")?.shortText ||
    component(components, "route")?.longText ||
    "";
  const line1 = [streetNumber, route].filter(Boolean).join(" ");
  const city =
    component(
      components,
      "locality",
      "postal_town",
      "sublocality",
      "sublocality_level_1",
      "administrative_area_level_3",
    )?.longText || "";
  const zip = component(components, "postal_code")?.longText || "";
  const stateComp = component(components, "administrative_area_level_1");
  const state = stateComp?.shortText || stateComp?.longText || "";
  return {
    line1,
    city,
    state,
    zip,
    formatted:
      formattedAddress ||
      [line1, city, state, zip].filter(Boolean).join(", "),
    lat: location?.latitude ?? null,
    lng: location?.longitude ?? null,
  };
}

export async function autocompletePlaces(input: string, sessionToken: string) {
  const key = mapsKey();
  if (!key) {
    return NextResponse.json({ suggestions: [], unavailable: true });
  }
  const q = input.trim();
  if (q.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }
  if (q.length > 200) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask":
        "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat",
    },
    // No includedPrimaryTypes — partial street queries often return empty when
    // limited to street_address/premise (same fix as keepers-field).
    body: JSON.stringify({
      input: q,
      sessionToken: sessionToken || undefined,
      includedRegionCodes: ["us"],
      regionCode: "us",
      languageCode: "en",
      locationBias: NJ_BIAS,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    suggestions?: Array<{
      placePrediction?: {
        placeId?: string;
        text?: { text?: string };
        structuredFormat?: {
          mainText?: { text?: string };
          secondaryText?: { text?: string };
        };
      };
    }>;
    error?: { message?: string };
  };

  if (!res.ok) {
    return NextResponse.json(
      { suggestions: [], error: data.error?.message || "Places lookup failed" },
      { status: 502 },
    );
  }

  const suggestions: PlaceSuggestion[] = (data.suggestions ?? [])
    .map((s) => s.placePrediction)
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.placeId))
    .map((p) => ({
      placeId: p.placeId as string,
      text: p.text?.text || "",
      mainText: p.structuredFormat?.mainText?.text || p.text?.text || "",
      secondaryText: p.structuredFormat?.secondaryText?.text || "",
    }));

  return NextResponse.json({ suggestions });
}

export async function placeDetails(placeId: string, sessionToken: string) {
  const key = mapsKey();
  if (!key) {
    return NextResponse.json({ unavailable: true }, { status: 503 });
  }
  const id = placeId.trim();
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return NextResponse.json({ error: "Invalid place" }, { status: 400 });
  }

  const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`);
  if (sessionToken) url.searchParams.set("sessionToken", sessionToken);

  const res = await fetch(url.toString(), {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "addressComponents,formattedAddress,location",
    },
  });

  const data = (await res.json().catch(() => ({}))) as {
    addressComponents?: AddressComponent[];
    formattedAddress?: string;
    location?: { latitude?: number; longitude?: number };
    error?: { message?: string };
  };

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error?.message || "Place details failed" },
      { status: 502 },
    );
  }

  return NextResponse.json(
    parseAddressComponents(
      data.addressComponents,
      data.formattedAddress,
      data.location,
    ),
  );
}

export async function readPlacesBody(req: Request) {
  try {
    return (await req.json()) as {
      input?: string;
      placeId?: string;
      sessionToken?: string;
    };
  } catch {
    return null;
  }
}
