import db from "../../config/database";

export function createNewGig(data) {
  return db.gigs.create({ data });
}

export function readAllGigs() {
  return db.gigs.findMany();
}
