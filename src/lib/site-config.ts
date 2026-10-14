// ─────────────────────────────────────────────────────────────────────────
// SITE CONFIG — single source for brand, contact, HIC, and address.
// ─────────────────────────────────────────────────────────────────────────
export const siteConfig = {
  legalName: "Pool Keepers NJ LLC",
  brandName: "Pool Keepers NJ",
  tagline: "Your pool, kept.",
  domain: "poolkeepersnj.com",
  phone: "(732) 592-4013",
  phoneHref: "tel:+17325924013",
  email: "info@poolkeepersnj.com", // TODO: confirm this inbox exists / forward it
  hicLicense: "13VH11735400", // NJ Home Improvement Contractor registration number
  njContractorNotice:
    "FOR INFORMATION ABOUT CONTRACTORS AND THE CONTRACTORS' REGISTRATION ACT, CONTACT THE NEW JERSEY DEPARTMENT OF LAW AND PUBLIC SAFETY, DIVISION OF CONSUMER AFFAIRS AT 1-888-656-6225.",
  serviceArea: "Ocean / Monmouth County",
  serviceAreaFull: "Monmouth, Ocean, Middlesex & Mercer Counties, NJ",
  serviceAreaTowns: [
    // Monmouth County
    "Spring Lake",
    "Point Pleasant",
    "Manasquan",
    "Howell",
    "Wall Township",
    "Sea Girt",
    "Manalapan",
    "Marlboro",
    "Freehold",
    "Middletown",
    "Red Bank",
    "Little Silver",
    "Rumson",
    "Highlands",
    "Colts Neck",
    "Holmdel",
    // Ocean County
    "Brick",
    "Toms River",
    "Jackson",
    "Lacey Township",
    "Manchester Township",
    "Berkeley Township",
    "Barnegat Township",
    "Stafford Township",
    "Lavallette",
    // Middlesex County
    "Old Bridge",
    "East Brunswick",
    "South Brunswick",
    "Monroe Township",
    "Sayreville",
    "Cranbury",
    "North Brunswick",
    // Mercer County
    "Hamilton Township",
    "West Windsor",
    "East Windsor",
    "Robbinsville",
    "Lawrence Township",
    "Princeton",
    "Hopewell Township",
  ],
  address: {
    line1: "18 Arizona Ave",
    city: "Whiting",
    state: "NJ",
    zip: "08759",
  },
  social: {
    facebook: "",
    instagram: "",
  },
  parentCompany: {
    name: "Keepers NJ",
    note: "Pool Keepers NJ is part of the Keepers NJ family of home service companies.",
  },
};

export function formatMailingAddress(): string {
  const { line1, city, state, zip } = siteConfig.address;
  return `${line1}, ${city}, ${state} ${zip}`.trim();
}
