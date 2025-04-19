import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'bookdb.db', // Tên cơ sở dữ liệu
    location: 'default', // Vị trí lưu trữ
  },
  () => {
    console.log('Database opened successfully');
    createTables();
  },
  error => {
    console.log('Error opening database: ', error);
  }
);


function createTables() {
  db.transaction(tx => {
    tx.executeSql('PRAGMA foreign_keys = ON;', [],
      () => console.log('Foreign keys enabled'),
      error => console.log('Error enabling foreign keys:', error)
    );
    executeCreateChapterTable(tx);
    executeCreateBookHistoryTable(tx);
  })
};


function executeCreateChapterTable(tx) {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS Chapters (
      id TEXT PRIMARY KEY,
      content TEXT,
      title TEXT,
      updated_at TEXT
    );`,
    [],
    () => console.log('Table Chapters created successfully'),
    error => console.log('Error creating table Chapters:', error)
  );
}

function getCurrentDateTime() {
  return new Date().toISOString();
}

const saveOrUpdateChapter = (friendly, data) => {
  // const jsonData = JSON.stringify(data);
  // console.log('jsonData: ', jsonData);
  const id = `${friendly}/${data.data.chapter.index}`;
  const updatedAt = getCurrentDateTime();

  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO Chapters (id, content, title, updated_at) VALUES (?, ?, ?, ?)`,
      [id, data.data.content, data.data.chapter.title, updatedAt],
      (_, result) => console.log('✅ Chapter saved/updated successfully!'),
      error => console.log('❌ Error saving/updating chapter:', error)
    );
  });
};

const getChapters = (friendly, index) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM Chapters';
    let params = [];
    if (friendly && index !== undefined) {
      const id = `${friendly}/${index}`;
      query += ' WHERE id = ?';
      params.push(id);
    }
    // console.log('select by id: ', params);
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, { rows }) => {
          let result = undefined;
          if (rows.length > 0) {
            result = {
              data: {
                id: rows.item(0).id,
                content: rows.item(0).content,
                chapter: {
                  title: rows.item(0).title
                }
              }
            };
          }
          resolve(result);
        },
        error => reject(`Error fetching chapters: ${error.message}`)
      );
    });
  });
};

function executeCreateBookHistoryTable(tx) {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS BookHistories (
      id TEXT PRIMARY KEY,
      friendly TEXT,
      title TEXT,
      chapter_id NUMBER,
      chapter_title TEXT,
      location NUMBER,
      updated_at TEXT,
      image TEXT
    );`,
    [],
    () => console.log('Table BookHistories created successfully'),
    error => console.log('Error creating table BookHistories:', error)
  );
}

const saveOrUpdateBookHistory = (book) => {
  // const bookHistory = JSON.stringify(book);
  // console.log('BookHistory: ', bookHistory);
  const updatedAt = getCurrentDateTime();
  book.chapter_id = book.chapter_id ?? null
  book.chapter_title = book.chapter_title ?? null
  book.location = book.location ?? 0

  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO BookHistories (id, friendly, title, chapter_id, chapter_title, location, image, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [book.book_id, book.friendly, book.title, book.chapter_id, book.chapter_title, book.location,
      book.image, updatedAt],
      (_, result) => console.log('✅ BookHistory saved/updated successfully!'),
      error => console.log('❌ Error saving/updating BookHistory:', error)
    );
  });
};

const getBookHistories = () => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM BookHistories';
    let params = [];
    // if (friendly && index) {
    //   const id = `${friendly}/${index}`;
    //   query += ' WHERE id = ?';
    //   params.push(id);
    // }

    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, { rows }) => {
          const result = [];
          if (rows.length > 0) {
            for (i = 0; i < rows.length; i++) {
              result.push(rows.item(i));
            }
            console.log('get BookHistories: ', result);
          }
          resolve(result);
        },
        error => reject(`Error fetching chapters: ${error.message}`)
      );
    });
  });
};

const getBookHistoryById = (book_id) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM BookHistories WHERE id = ?';
    db.transaction(tx => {
      tx.executeSql(
        query,
        [book_id],
        (_, { rows }) => {
          let result = undefined;
          if (rows.length > 0) {
            result = rows.item(0);
            console.log('get bookHistory by id: ', result);
          }
          resolve(result);
        },
        error => reject(`Error fetching chapters: ${error.message}`)
      );
    });
  });
};

module.exports = {
  saveOrUpdateChapter,
  getChapters,
  saveOrUpdateBookHistory,
  getBookHistories,
  getBookHistoryById
}
