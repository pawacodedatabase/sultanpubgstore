// Account.ts
export interface GameAccount {
    id: number; // Unique identifier for the account
    name?: string;
    price?: number;
    accountFeatures?: string[];
    moreFeat?: string[];
    images?: string[];
    videoLink?: string;
    status?: boolean;
    mythicsCount?: number;
    carsCount?: number;
    gunSkinsCount?: number;
    accountLevel?: string;
  }

  import rabayii_1 from './images/rabayii_1.jpg'
  import rabayii_2 from './images/rabayii_2.jpg'
  import rabayii_3 from './images/rabayii_3.jpg'
  import rabayii_4 from './images/rabayii_4.jpg'
  import rabayii_5 from './images/rabayii_5.jpg'
  import rabayii_6 from './images/rabayii_6.jpg'
  
  export const accounts: GameAccount[] = [
    {
      id: 1,
      name: "#646",
      price: 550,
      accountFeatures: [
        "LEVEL 7 GLACIER M4",
      "LEVEL 7 SEVEN SEA AKM",
      "LEVEL 5 DEVIOUS CYBER P90",
      "LEVEL 4 EVENTIDE GROZA",
      "LEVEL 4 CONCERTO M762 ",
      "LEVEL 4 EMP UMP",
      "LEVEL 4 JADE DP",
      "LEVEL 4 BLOOD VECTOR",
      "LEVEL 4 KILLER TUNE M24",
      "LEVEL 4 SOARING MG3 ",
      "LEVEL 1 SEALED NETHER M4 ",
      
        "WHITE MUMMY SET✅"
      ],

      moreFeat : [
        "KOENIGSEGG GEMERA", 
        "KOENIGSEGG JESKO",
        "BENTLEY CONTINENTAL GT",
        "TESLA ROADSTER ",
        "TESLA CYBER TRUCK ",
      ],
      images: [
        rabayii_1, rabayii_2, rabayii_3, rabayii_4,rabayii_5,rabayii_6
      ],
      videoLink: "https://t.me/Sultan_pubg_acc_Dealerr/1762",
      status: false,
      mythicsCount: 8,
      carsCount: 8,
      gunSkinsCount: 30,
      accountLevel: "Conquerer",
    }
    
    
    ,
{
      id: 2,
      name: "Pro Sniper Account",
      price: 600,
      accountFeatures: ["Special sniper rifle skins", "5 cars unlocked"],
      moreFeat: [" Set", "Unlocked 5 cars"],
     
      images: [
        "https://example.com/images/account2-1.jpg",
        "https://example.com/images/account2-2.jpg",
      ],
      videoLink: "https://youtu.be/example2",
      status: true,
      mythicsCount: 5,
      carsCount: 5,
      gunSkinsCount: 15,
      accountLevel: "Conquerer",
    },
  ];
  