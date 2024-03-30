import {
  enablePromise,
  openDatabase,
} from "react-native-sqlite-storage"

enablePromise(true)

type Login =  {
  userName: string,
  passWord: string,
}

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "FitnessApp.db", location: "default" },
    () => {},
    (error: any) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}

export const createTables = async (db: any) => {
  const loginQuery = `
   CREATE TABLE IF NOT EXISTS Logins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userName TEXT,
      passWord TEXT
   )
  `
  try {
    await db.executeSql(loginQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables`)
  }
}

export const getTableNames = async (db: any): Promise<string[]> => {
  try {
    const tableNames: string[] = []
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    results?.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name)
      }
    })
    return tableNames
  } catch (error) {
    console.error(error)
    throw Error("Failed to get table names from database")
  }
}

export const removeTable = async (db: any, tableName: any) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`
  try {
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop table ${tableName}`)
  }
}

export const addLogin = async (db: any, login: Login) => {
  const insertQuery = `
   INSERT INTO Logins (userName, passWord)
   VALUES (?, ?)
 `
  const values = [
    login.userName,
    login.passWord,
  ]
  try {
    return db.executeSql(insertQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to add contact")
  }
}

export const getLogins = async (db: any): Promise<Login[]> => {
  try {
    const logins: Login[] = []
    const results = await db.executeSql("SELECT * FROM Logins")
    results?.forEach((result: any) => {
      for (let index = 0; index < result.rows.length; index++) {
        logins.push(result.rows.item(index))
      }
    })
    return logins
  } catch (error) {
    console.error(error)
    throw Error("Failed to get Contacts from database")
  }
}

export const updateLogin = async (
  db: any,
  updatedLogin: Login
) => {
  const updateQuery = `
    UPDATE Logins
    SET userName = ?, passWord = ?
    WHERE id = ?
  `
  const values = [
    updatedLogin.userName,
    updatedLogin.passWord,
  ]
  try {
    return db.executeSql(updateQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to update contact")
  }
}

export const deleteLogin = async (db: any, login: Login) => {
  const deleteQuery = `
    DELETE FROM Logins
    WHERE id = ?
  `
  const values = [login.id]
  try {
    return db.executeSql(deleteQuery, values)
  } catch (error) {
    console.error(error)
    throw Error("Failed to remove contact")
  }
}