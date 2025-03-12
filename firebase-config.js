// Dodaj ten kod na początku firebase-config.js
// Obsługa błędów Firebase
try {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  window.db = db; // Udostępnij db globalnie
} catch (error) {
  console.error("Błąd Firebase:", error);
  // Fallback - symulowana baza danych
  window.db = {
    collection: () => ({
      get: () => Promise.resolve({
        docs: [
          { id: "1", data: () => ({ name: "eska®clean 1001", consumption: 180 }) },
          { id: "2", data: () => ({ name: "eska®clean 2250", consumption: 150 }) }
        ]
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
