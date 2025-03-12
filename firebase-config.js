// Konfiguracja Firebase - NALEŻY ZASTĄPIĆ WŁASNYMI DANYMI z konsoli Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1u7AlVYAUluw9jPQpEvg8bLX5gMw1jzk",
  authDomain: "haugchemie-d0bdb.firebaseapp.com",
  projectId: "haugchemie-d0bdb",
  storageBucket: "haugchemie-d0bdb.firebasestorage.app",
  messagingSenderId: "537595385",
  appId: "1:537595385:web:a306417977cab05f674128"
};

// Inicjalizacja Firebase
try {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  window.db = db; // Udostępnij db globalnie
  console.log("Firebase załadowany pomyślnie!");
} catch (error) {
  console.error("Błąd Firebase:", error);
  // Fallback - symulowana baza danych
  window.db = {
    collection: () => ({
      get: () => Promise.resolve({
        empty: false,
        docs: [
          { id: "1", data: () => ({ name: "eska®clean 1001", consumption: 180 }) },
          { id: "2", data: () => ({ name: "eska®clean 2250", consumption: 150 }) },
          { id: "3", data: () => ({ name: "eska®strip H 365A", consumption: 220 }) },
          { id: "4", data: () => ({ name: "eska®phos 2023", consumption: 160 }) },
          { id: "5", data: () => ({ name: "eska®phos 3045", consumption: 190 }) }
        ]
      }),
      where: () => ({
        get: () => Promise.resolve({
          empty: true,
          docs: []
        }),
        where: () => ({
          get: () => Promise.resolve({
            empty: true,
            docs: []
          })
        }),
        limit: () => ({
          get: () => Promise.resolve({
            empty: true,
            docs: []
          })
        }),
        orderBy: () => ({
          get: () => Promise.resolve({
            empty: true,
            docs: []
          })
        })
      }),
      add: () => Promise.resolve({ id: "new-id" }),
      doc: (id) => ({
        update: () => Promise.resolve(),
        delete: () => Promise.resolve()
      })
    })
  };
  console.log("Utworzono symulowaną bazę danych!");
}
