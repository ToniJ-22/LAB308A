import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };


  return new Promise(async (resolve, reject) => {
  
    if (typeof id !== "number") {
      reject("ID must be a number");
      return;
    }

    try {
     
      const dbName = await central(id);

 
      const [dbData, vaultData] = await Promise.all([
        dbs[dbName](id),
        vault(id)
      ]);

      
      resolve({
        id: id,
        name: vaultData.name,
        username: dbData.username,
        email: vaultData.email,
        address: vaultData.address,
        phone: vaultData.phone,
        website: dbData.website,
        company: dbData.company
      });
    } catch (error) {
      reject(error);
    }
  });
}

export { getUserData };
