import { Store } from "../model/store";

export const categories = {
  groceries: "Groceries",
  electronics: "Electronics",
  entertainment: "Entertainment",
  clothing: "Clothing",
  homeGoods: "Home Goods",
  beauty: "Beauty",
  sports: "Sports",
  toys: "Toys",
  books: "Books",
  furniture: "Furniture",
  automotive: "Automotive",
  health: "Health",
  jewelry: "Jewelry",
  music: "Music",
  officeSupplies: "Office Supplies",
  petSupplies: "Pet Supplies",
  travel: "Travel",
  fuel: "Fuel",
  liquor: "Liquor",
  restaurants: "Restaurants",
  diy: "Hardware / DIY",
  other: "Other",
} as const;

export const stores: Store[] = [
  {
    id: "1",
    name: "SASOL",
    categories: [categories.fuel],
    backgroundColor: "#fff",
    textColor: "#000",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758492744/Sasol_idaIlfPTrS_1_q8ycaz.png",
  },
  {
    id: "2",
    categories: [categories.groceries, categories.liquor],
    name: "Checkers",
    backgroundColor: "#38a8ae",
    textColor: "#ffffff",
    logoUrl:
      "https://www.greenstonemall.co.za/images/Store-article-logos/Checkers.jpg",
  },
  {
    id: "3",
    categories: [categories.groceries, categories.liquor],
    name: "Woolworths",
    backgroundColor: "#000",
    textColor: "#ffffff",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758493778/Woolworths_SA_idcsqKF_rJ_5_sttlhu.png",
  },
  {
    id: "4",
    categories: [categories.groceries, categories.liquor],
    name: "Pick n Pay",
    backgroundColor: "#fff",
    textColor: "#003359",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758492431/Pick_n_Pay_Stores_idBhR3mFWL_1_dnsqdg.png",
  },
  {
    id: "5",
    name: "Clicks",
    categories: [categories.health],
    backgroundColor: "#fff",
    textColor: "#003268",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758493753/Clicks_id08XPzknV_1_aexyzu.png",
  },
  {
    id: "6",
    name: "Dischem",
    categories: [categories.health],
    backgroundColor: "#128b3a",
    textColor: "#ffffff",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758492143/Dis-Chem_Pharmacies_idw8b4sQGI_1_vrxyeo.png",
  },
  {
    id: "7",
    name: "Game",
    categories: [categories.groceries, categories.liquor],
    backgroundColor: "#cf008d",
    textColor: "#ffffff",
  },
  {
    id: "8",
    name: "Makro",
    categories: [categories.groceries, categories.liquor],
    backgroundColor: "#ffe11b",
    textColor: "#000",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758529350/Makro_id4zrQOIYI_0_dciiq0.png",
  },
  {
    id: "9",
    name: "Builders Warehouse",
    categories: [
      categories.electronics,
      categories.furniture,
      categories.travel,
    ],
    backgroundColor: "#ffd600",
    textColor: "#000",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758548433/builders_nekn5l.png",
  },
  {
    id: "10",
    name: "Mr Price",
    categories: [categories.clothing],
    backgroundColor: "red",
    textColor: "#ffffff",
  },
  {
    id: "11",
    name: "+more",
    categories: [categories.electronics, categories.clothing],
    backgroundColor: "#fff",
    textColor: "#000",
    logoUrl:
      "https://cdn.shopify.com/s/files/1/0289/5219/9203/files/plus-more-logo_blk.png?v=1713278395",
  },
  {
    id: "12",
    name: "Spar",
    categories: [categories.groceries, categories.liquor],
    backgroundColor: "#fff",
    textColor: "#fff",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758530621/SPAR_idkNtsGCy2_1_fdrpmm.png",
  },
  {
    id: "13",
    name: "Food Lover's Market",
    categories: [categories.groceries],
    backgroundColor: "#fff",
    textColor: "#008000",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758567903/flm-green-favicon_afaskd.png",
  },
  {
    id: "14",
    name: "The Local Choice",
    categories: [categories.health],
    backgroundColor: "#fff",
    textColor: "#000",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758540976/The-Local-Choice-Pharmacy-Store-Logo-Full-Colour_kn9adf.png",
  },
  {
    id: "15",
    name: "TFG",
    categories: [categories.clothing],
    backgroundColor: "#622776",
    textColor: "#fff",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758735463/TFG_Limited_Logo.svg_l5gavp.png",
  },
  {
    id: "16",
    name: "Norman Goodfellows",
    categories: [categories.liquor],
    backgroundColor: "#000",
    textColor: "#fff",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758735612/RedT_Norman_Goodfellows_Project-19_elcsez.jpg",
  },
  {
    id: "17",
    name: "Shell",
    categories: [categories.fuel],
    backgroundColor: "#fff",
    textColor: "#e60000",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758732460/shell_acutgj.png",
  },
  {
    id: "18",
    name: "Total",
    categories: [categories.fuel],
    backgroundColor: "#fff",
    textColor: "#ff0000",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758750516/total_nano-banana-2_vhjbmn.png",
  },
  {
    id: "19",
    name: "Boxer",
    categories: [categories.groceries, categories.liquor],
    backgroundColor: "#fff",
    textColor: "#0033a0",
    logoUrl:
      "https://res.cloudinary.com/dgsqgajl7/image/upload/v1758745772/boxer2_erzpei.png",
  }
];
