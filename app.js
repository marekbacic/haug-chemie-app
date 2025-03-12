c// Używamy React Hooks
const { useState, useEffect } = React;

// Główny komponent aplikacji
const HaugChemieApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('chemicalConsumption');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // Referencje do kolekcji w Firebase
  const productsCollection = db.collection("products");
  const usersCollection = db.collection("users");
  const clientsCollection = db.collection("clients");
  const reportsCollection = db.collection("reports");
  
  // Stan dla produktów
  const [products, setProducts] = useState([]);
  
  // Sprawdzenie czy użytkownik jest zalogowany przy starcie
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);
  
  // Pobierz produkty z Firebase
const fetchProducts = async () => {
  try {
    const snapshot = await productsCollection.get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(data);
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
    // Jeśli nie można pobrać danych, użyj domyślnych
    setProducts([
      { id: "1", name: "eska®clean 1001", consumption: 180 },
      { id: "2", name: "eska®clean 2250", consumption: 150 },
      { id: "3", name: "eska®strip H 365A", consumption: 220 },
      { id: "4", name: "eska®phos 2023", consumption: 160 },
      { id: "5", name: "eska®phos 3045", consumption: 190 },
    ]);
  }
  
  // Pobierz dane przy pierwszym ładowaniu aplikacji
  useEffect(() => {
    fetchProducts();
    
    // Inicjalizacja konta administratora, jeśli nie istnieje
    const initializeAdmin = async () => {
      try {
        const adminSnapshot = await usersCollection
          .where("role", "==", "admin")
          .limit(1)
          .get();
        
        if (adminSnapshot.empty) {
          await usersCollection.add({
            name: "Administrator",
            email: "admin@haugchemie.com",
            password: "admin123", // W rzeczywistej aplikacji używaj hashowania haseł
            role: "admin",
            createdAt: new Date()
          });
          console.log("Utworzono domyślne konto administratora");
        }
      } catch (error) {
        console.error("Błąd podczas inicjalizacji administratora:", error);
      }
    };
    
    initializeAdmin();
  }, []);
  
  // Funkcja logowania
  const handleLogin = async () => {
    setLoginError('');
    
    if (!loginCredentials.email || !loginCredentials.password) {
      setLoginError('Wprowadź email i hasło');
      return;
    }
    
    try {
      const userSnapshot = await usersCollection
        .where("email", "==", loginCredentials.email)
        .where("password", "==", loginCredentials.password)
        .limit(1)
        .get();
      
      if (userSnapshot.empty) {
        setLoginError('Nieprawidłowy email lub hasło');
        return;
      }
      
      const userData = {
        id: userSnapshot.docs[0].id,
        ...userSnapshot.docs[0].data()
      };
      
      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setLoginModalOpen(false);
      setLoginCredentials({ email: '', password: '' });
      
      // Ustaw odpowiednią zakładkę w zależności od roli
      if (userData.role === 'admin') {
        setActiveTab('adminPanel');
      } else if (userData.role === 'salesRep') {
        setActiveTab('salesRepPanel');
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
      setLoginError('Wystąpił błąd podczas logowania');
    }
  };
  
  // Funkcja wylogowania
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveTab('chemicalConsumption');
  };
  
  // Baza danych chłodziw
  const coolantDatabase = [
    {
      name: "eska®cool 2300",
      hardnessRange: "-",
      hardnessTotal: 10,
      oilPercent: 0,
      refractionMultiplier: 2.1,
      components: {
        bor: false,
        amin: true,
        dcha: false,
        fad: false
      },
      lubricationEfficiency: {
        low: "good", // ●●
        medium: "not-suitable", // -
        high: "not-suitable" // -
      },
      operationTypes: {
        grinding: "good", // ●●
        turning: "not-suitable", // -
        millingDrilling: "not-suitable" // -
      },
      materials: {
        steel: "best", // ●●●
        stainlessSteel: "best", // ●●●
        castIron: "good", // ●●
        aluminum: "not-suitable", // -
        nonFerrousMetals: "not-suitable", // -
        carbide: "not-suitable" // -
      }
    },
    {
      name: "eska®cool 5200",
      hardnessRange: "-",
      hardnessTotal: 10,
      oilPercent: 0,
      refractionMultiplier: 1.5,
      components: {
        bor: false,
        amin: true,
        dcha: false,
        fad: false
      },
      lubricationEfficiency: {
        low: "good", // ●●
        medium: "not-suitable", // -
        high: "not-suitable" // -
      },
      operationTypes: {
        grinding: "good", // ●●
        turning: "conditionally-suitable", // ○
        millingDrilling: "conditionally-suitable" // ○
      },
      materials: {
        steel: "not-suitable", // -
        stainlessSteel: "suitable", // ●
        castIron: "best", // ●●●
        aluminum: "best", // ●●●
        nonFerrousMetals: "not-suitable", // -
        carbide: "not-suitable" // -
      }
    },
    {
      name: "eska®lub 1220",
      hardnessRange: "2-30",
      hardnessTotal: 8,
      oilPercent: 30,
      refractionMultiplier: 1.3,
      components: {
        bor: false,
        amin: true,
        dcha: false,
        fad: false
      },
      lubricationEfficiency: {
        low: "good", // ●●
        medium: "suitable", // ●
        high: "not-suitable" // -
      },
      operationTypes: {
        grinding: "good", // ●●
        turning: "good", // ●●
        millingDrilling: "good" // ●●
      },
      materials: {
        steel: "good", // ●●
        stainlessSteel: "suitable", // ●
        castIron: "good", // ●●
        aluminum: "good", // ●●
        nonFerrousMetals: "suitable", // ●
        carbide: "suitable" // ●
      }
    },
    {
      name: "eska®lub 2320",
      hardnessRange: "5-30",
      hardnessTotal: 6,
      oilPercent: 30,
      refractionMultiplier: 1.3,
      components: {
        bor: false,
        amin: true,
        dcha: true,
        fad: false
      },
      lubricationEfficiency: {
        low: "good", // ●●
        medium: "good", // ●●
        high: "not-suitable" // -
      },
      operationTypes: {
        grinding: "good", // ●●
        turning: "good", // ●●
        millingDrilling: "best" // ●●●
      },
      materials: {
        steel: "good", // ●●
        stainlessSteel: "best", // ●●●
        castIron: "conditionally-suitable", // ○
        aluminum: "conditionally-suitable", // ○
        nonFerrousMetals: "not-suitable", // -
        carbide: "not-suitable" // -
      }
    },
    {
      name: "eska®lub 3350",
      hardnessRange: "5-30",
      hardnessTotal: 15,
      oilPercent: 30,
      refractionMultiplier: 1.2,
      components: {
        bor: false,
        amin: true,
        dcha: true,
        fad: false
      },
      lubricationEfficiency: {
        low: "good", // ●●
        medium: "good", // ●●
        high: "suitable" // ●
      },
      operationTypes: {
        grinding: "good", // ●●
        turning: "good", // ●●
        millingDrilling: "good" // ●●
      },
      materials: {
        steel: "best", // ●●●
        stainlessSteel: "good", // ●●
        castIron: "good", // ●●
        aluminum: "best", // ●●●
        nonFerrousMetals: "suitable", // ●
        carbide: "conditionally-suitable" // ○
      }
    },
    {
      name: "eska®lub 4131",
      hardnessRange: "15-25",
      hardnessTotal: 6,
      oilPercent: 45,
      refractionMultiplier: 1.0,
      components: {
        bor: false,
        amin: false,
        dcha: false,
        fad: false
      },
      lubricationEfficiency: {
        low: "suitable", // ●
        medium: "good", // ●●
        high: "good" // ●●
      },
      operationTypes: {
        grinding: "good", // ●●
        turning: "good", // ●●
        millingDrilling: "good" // ●●
      },
      materials: {
        steel: "best", // ●●●
        stainlessSteel: "not-suitable", // -
        castIron: "best", // ●●●
        aluminum: "suitable", // ●
        nonFerrousMetals: "suitable", // ●
        carbide: "not-suitable" // -
      }
    },
    {
      name: "eska®lub 4300",
      hardnessRange: "10-30",
      hardnessTotal: 6,
      oilPercent: 45,
      refractionMultiplier: 1.0,
      components: {
        bor: false,
        amin: true,
        dcha: true,
        fad: false
      },
      lubricationEfficiency: {
        low: "suitable", // ●
        medium: "good", // ●●
        high: "good" // ●●
      },
      operationTypes: {
        grinding: "good", // ●●
        turning: "good", // ●●
        millingDrilling: "best" // ●●●
      },
      materials: {
        steel: "best", // ●●●
        stainlessSteel: "suitable", // ●
        castIron: "suitable", // ●
        aluminum: "conditionally-suitable", // ○
        nonFerrousMetals: "not-suitable", // -
        carbide: "not-suitable" // -
      }
    },
    {
      name: "eska®lub 4335",
      hardnessRange: "10-30",
      hardnessTotal: 6,
      oilPercent: 40,
      refractionMultiplier: 1.0,
      components: {
        bor: false,
        amin: true,
        dcha: true,
        fad: false
      },
      lubricationEfficiency: {
        low: "suitable", // ●
        medium: "good", // ●●
        high: "good" // ●●
      },
      operationTypes: {
        grinding: "suitable", // ●
        turning: "good", // ●●
        millingDrilling: "good" // ●●
      },
      materials: {
        steel: "best", // ●●●
        stainlessSteel: "best", // ●●●
        castIron: "suitable", // ●
        aluminum: "good", // ●●
        nonFerrousMetals: "conditionally-suitable", // ○
        carbide: "not-suitable" // -
      }
    },
    {
      name: "eska®lub 6530",
      hardnessRange: "10-30",
      hardnessTotal: 6,
      oilPercent: 65,
      refractionMultiplier: 0.9,
      components: {
        bor: false,
        amin: false,
        dcha: false,
        fad: true
      },
      lubricationEfficiency: {
        low: "suitable", // ●
        medium: "good", // ●●
        high: "suitable" // ●
      },
      operationTypes: {
        grinding: "not-suitable", // -
        turning: "good", // ●●
        millingDrilling: "good" // ●●
      },
      materials: {
        steel: "conditionally-suitable", // ○
        stainlessSteel: "suitable", // ●
        castIron: "not-suitable", // -
        aluminum: "good", // ●●
        nonFerrousMetals: "best", // ●●●
        carbide: "good" // ●●
      }
    }
  ];

  // Panel administracyjny - zarządzanie produktami
  const ProductManagement = () => {
    const [newProduct, setNewProduct] = useState({ name: '', consumption: 0 });
    const [editingProduct, setEditingProduct] = useState(null);
    
    // Dodaj produkt do Firebase
    const addProduct = async () => {
      if (newProduct.name && newProduct.consumption > 0) {
        try {
          await productsCollection.add({
            name: newProduct.name,
            consumption: parseFloat(newProduct.consumption)
          });
          fetchProducts(); // Odśwież listę
          setNewProduct({ name: '', consumption: 0 });
        } catch (error) {
          console.error("Błąd podczas dodawania produktu:", error);
          alert("Wystąpił błąd podczas dodawania produktu.");
        }
      }
    };
    
    // Aktualizuj produkt w Firebase
    const updateProduct = async () => {
      if (editingProduct && editingProduct.name && editingProduct.consumption > 0) {
        try {
          await productsCollection.doc(editingProduct.id).update({
            name: editingProduct.name,
            consumption: parseFloat(editingProduct.consumption)
          });
          fetchProducts(); // Odśwież listę
          setEditingProduct(null);
        } catch (error) {
          console.error("Błąd podczas aktualizacji produktu:", error);
          alert("Wystąpił błąd podczas aktualizacji produktu.");
        }
      }
    };
    
    // Usuń produkt z Firebase
    const deleteProduct = async (id) => {
      try {
        await productsCollection.doc(id).delete();
        fetchProducts(); // Odśwież listę
      } catch (error) {
        console.error("Błąd podczas usuwania produktu:", error);
        alert("Wystąpił błąd podczas usuwania produktu.");
      }
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Zarządzanie Produktami</h2>
        
        <div className="mb-6 p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Dodaj Nowy Produkt</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Nazwa produktu"
              className="flex-1 p-2 border rounded"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <input
              type="number"
              placeholder="Zużycie g/m²"
              className="md:w-32 p-2 border rounded"
              value={newProduct.consumption || ''}
              onChange={(e) => setNewProduct({...newProduct, consumption: parseFloat(e.target.value)})}
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={addProduct}
            >
              Dodaj
            </button>
          </div>
        </div>
        
        {editingProduct && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-2">Edytuj Produkt</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Nazwa produktu"
                className="flex-1 p-2 border rounded"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
              />
              <input
                type="number"
                placeholder="Zużycie g/m²"
                className="md:w-32 p-2 border rounded"
                value={editingProduct.consumption || ''}
                onChange={(e) => setEditingProduct({...editingProduct, consumption: parseFloat(e.target.value)})}
              />
              <button 
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                onClick={updateProduct}
              >
                Zapisz
              </button>
              <button 
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                onClick={() => setEditingProduct(null)}
              >
                Anuluj
              </button>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Nazwa Produktu</th>
                <th className="py-2 px-4 border-b text-center">Zużycie (g/m²)</th>
                <th className="py-2 px-4 border-b text-center">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b text-center">{product.consumption}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edytuj
                    </button>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Kalkulator zużycia chemii
  const ChemicalConsumptionCalculator = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [result, setResult] = useState(null);
    
    const calculateConsumption = () => {
      const product = products.find(p => p.name === selectedProduct);
      if (product && area && price) {
        const areaValue = parseFloat(area);
        const priceValue = parseFloat(price);
        
        const consumptionPerArea = product.consumption / 1000; // g/m² to kg/m²
        const totalConsumption = consumptionPerArea * areaValue; // kg
        const totalCost = totalConsumption * priceValue; // EUR
        
        setResult({
          consumptionPerArea: consumptionPerArea,
          totalConsumption: totalConsumption,
          totalCost: totalCost
        });
      }
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Kalkulator zużycia chemii</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz produkt</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Wybierz produkt</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Powierzchnia (m²)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Podaj ilość m²"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cena (EUR/kg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Podaj cenę w euro za 1 kg"
            />
          </div>
          
          <div className="flex items-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              onClick={calculateConsumption}
            >
              Oblicz
            </button>
          </div>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Wyniki</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">Zużycie na 1m²</p>
                <p className="text-xl font-bold">{result.consumptionPerArea.toFixed(3)} kg/m²</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">Całkowite zużycie</p>
                <p className="text-xl font-bold">{result.totalConsumption.toFixed(2)} kg</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">Całkowity koszt</p>
                <p className="text-xl font-bold">{result.totalCost.toFixed(2)} EUR</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Kalkulator objętości dla eska®strip H 365A
  const VolumeCalculator = () => {
    const [tankVolume, setTankVolume] = useState('');
    const [result, setResult] = useState(null);
    
    const calculateVolume = () => {
      if (tankVolume) {
        const tankVolumeValue = parseFloat(tankVolume);
        
        // Produkt eska®strip H 365A waży 1,21 kg/l i działa w stężeniu 50% wagowo z wodą
        const density = 1.21; // kg/l
        const concentration = 0.5; // 50%
        
        // Obliczamy, ile potrzeba produktu i wody
        // Dla 50% stężenia wagowego i gęstości produktu 1,21 kg/l
        const totalTankWeight = tankVolumeValue; // Zakładamy, że waga wody to 1 kg/l
        const chemicalWeight = totalTankWeight * concentration;
        const chemicalVolume = chemicalWeight / density;
        const waterVolume = tankVolumeValue - chemicalVolume;
        
        setResult({
          chemicalVolume: chemicalVolume,
          waterVolume: waterVolume,
          ratio: `1:${(waterVolume / chemicalVolume).toFixed(2)}`
        });
      }
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Kalkulator objętości eska®strip H 365A</h2>
        <p className="mb-4 text-gray-600">
          Preparat waży 1,21 kg na 1 litr i działa w stężeniu 50% wagowo z wodą.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pojemność wanny (litry)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={tankVolume}
              onChange={(e) => setTankVolume(e.target.value)}
              placeholder="Podaj pojemność wanny w litrach"
            />
          </div>
          
          <div className="flex items-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              onClick={calculateVolume}
            >
              Oblicz
            </button>
          </div>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Stosunek chemii do wody</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">eska®strip H 365A</p>
                <p className="text-xl font-bold">{result.chemicalVolume.toFixed(2)} L</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">Woda</p>
                <p className="text-xl font-bold">{result.waterVolume.toFixed(2)} L</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">Stosunek (chemia:woda)</p>
                <p className="text-xl font-bold">{result.ratio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Kalkulator uzupełniania stężenia chemii
  const ConcentrationCalculator = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [currentConcentration, setCurrentConcentration] = useState('');
    const [targetConcentration, setTargetConcentration] = useState('');
    const [bathVolume, setBathVolume] = useState('');
    const [result, setResult] = useState(null);
    
    const calculateAddition = () => {
      if (selectedProduct && currentConcentration && targetConcentration && bathVolume) {
        const currentConcentrationValue = parseFloat(currentConcentration);
        const targetConcentrationValue = parseFloat(targetConcentration);
        const bathVolumeValue = parseFloat(bathVolume);
        
        // Obliczenia tylko jeśli stężenie docelowe jest większe od aktualnego
        if (targetConcentrationValue <= currentConcentrationValue) {
          setResult({
            error: "Stężenie docelowe musi być większe od aktualnego!"
          });
          return;
        }
        
        // Wzór: V2 = V1 * (C2 - C1) / (100 - C2)
        // gdzie:
        // V1 - objętość kąpieli
        // C1 - obecne stężenie
        // C2 - stężenie docelowe
        // V2 - objętość chemii do dodania
        
        const chemicalToAdd = bathVolumeValue * (targetConcentrationValue - currentConcentrationValue) / (100 - targetConcentrationValue);
        
        setResult({
          chemicalToAdd: chemicalToAdd,
          newVolume: bathVolumeValue + chemicalToAdd
        });
      }
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Uzupełnianie stężenia chemii</h2>
        <p className="mb-4 text-gray-600">
          Oblicz ilość produktu, którą należy dodać do kąpieli, aby uzyskać wymagane stężenie.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz produkt</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Wybierz produkt</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aktualne stężenie (%)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={currentConcentration}
              onChange={(e) => setCurrentConcentration(e.target.value)}
              placeholder="Podaj aktualne stężenie w %"
              min="0"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wymagane stężenie (%)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={targetConcentration}
              onChange={(e) => setTargetConcentration(e.target.value)}
              placeholder="Podaj wymagane stężenie w %"
              min="0"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pojemność wanny (litry)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={bathVolume}
              onChange={(e) => setBathVolume(e.target.value)}
              placeholder="Podaj pojemność wanny w litrach"
              min="0"
            />
          </div>
          
          <div className="md:col-span-2 flex items-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              onClick={calculateAddition}
            >
              Oblicz
            </button>
          </div>
        </div>
        
        {result && !result.error && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Wyniki</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">Ilość produktu do dodania</p>
                <p className="text-xl font-bold">{result.chemicalToAdd.toFixed(2)} L</p>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <p className="text-sm text-gray-500">Nowa objętość kąpieli</p>
                <p className="text-xl font-bold">{result.newVolume.toFixed(2)} L</p>
              </div>
            </div>
          </div>
        )}
        
        {result && result.error && (
          <div className="mt-6 p-4 bg-red-50 rounded-md">
            <h3 className="text-lg font-medium mb-2 text-red-700">Błąd</h3>
            <p className="text-red-700">{result.error}</p>
          </div>
        )}
      </div>
    );
  };

  // Selektor chłodziw
  const CoolantSelector = () => {
    const [waterHardness, setWaterHardness] = useState('');
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedOperations, setSelectedOperations] = useState([]);
    const [results, setResults] = useState([]);
    
    const allMaterials = [
      { id: 'steel', name: 'Stal' },
      { id: 'stainlessSteel', name: 'Stal nierdzewna' },
      { id: 'castIron', name: 'Żeliwo' },
      { id: 'aluminum', name: 'Aluminium' },
      { id: 'nonFerrousMetals', name: 'Metale kolorowe' },
      { id: 'carbide', name: 'Węglik' }
    ];
    
    const allOperations = [
      { id: 'grinding', name: 'Szlifowanie' },
      { id: 'turning', name: 'Toczenie' },
      { id: 'millingDrilling', name: 'Frezowanie/Wiercenie' }
    ];
    
    const handleSelectMaterial = (materialId) => {
      if (selectedMaterials.includes(materialId)) {
        setSelectedMaterials(selectedMaterials.filter(id => id !== materialId));
      } else {
        setSelectedMaterials([...selectedMaterials, materialId]);
      }
    };
    
    const handleSelectOperation = (operationId) => {
      if (selectedOperations.includes(operationId)) {
        setSelectedOperations(selectedOperations.filter(id => id !== operationId));
      } else {
        setSelectedOperations([...selectedOperations, operationId]);
      }
    };
    
    const getSuitabilityScore = (suitability) => {
      const scoreMap = {
        'best': 4,
        'good': 3,
        'suitable': 2,
        'conditionally-suitable': 1,
        'not-suitable': 0
      };
      return scoreMap[suitability] || 0;
    };
    
    const findBestCoolants = () => {
      if (!waterHardness || selectedMaterials.length === 0 || selectedOperations.length === 0) {
        return;
      }
      
      const hardnessValue = parseFloat(waterHardness);
      
      const scoredCoolants = coolantDatabase.map(coolant => {
        // Check if water hardness is in range
        let isHardnessInRange = true;
        if (coolant.hardnessRange !== "-") {
          const [min, max] = coolant.hardnessRange.split('-').map(Number);
          isHardnessInRange = hardnessValue >= min && hardnessValue <= max;
        }
        
        // Calculate material suitability score
        let materialScore = 0;
        selectedMaterials.forEach(materialId => {
          materialScore += getSuitabilityScore(coolant.materials[materialId]);
        });
        
        // Calculate operation suitability score
        let operationScore = 0;
        selectedOperations.forEach(operationId => {
          operationScore += getSuitabilityScore(coolant.operationTypes[operationId]);
        });
        
        // Calculate total score
        const totalScore = isHardnessInRange ? (materialScore + operationScore) : 0;
        
        return {
          ...coolant,
          isHardnessInRange,
          materialScore,
          operationScore,
          totalScore
        };
      });
      
      // Sort by total score
      const sortedCoolants = scoredCoolants.sort((a, b) => b.totalScore - a.totalScore);
      
      // Filter out coolants with zero score
      const bestCoolants = sortedCoolants.filter(coolant => coolant.totalScore > 0);
      
      setResults(bestCoolants);
    };
    
    // Function to get the rating as dots
    const renderRating = (rating) => {
      const ratings = {
        'best': '●●●',
        'good': '●●',
        'suitable': '●',
        'conditionally-suitable': '○',
        'not-suitable': '-'
      };
      return ratings[rating] || '-';
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Dopasuj chłodziwo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Twardość wody (°dH)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={waterHardness}
              onChange={(e) => setWaterHardness(e.target.value)}
              placeholder="Podaj twardość wody"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Materiały obrabiane</label>
            <div className="bg-gray-50 p-3 rounded border max-h-40 overflow-y-auto">
              {allMaterials.map(material => (
                <div key={material.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`material-${material.id}`}
                    checked={selectedMaterials.includes(material.id)}
                    onChange={() => handleSelectMaterial(material.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`material-${material.id}`}>{material.name}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rodzaj obróbki</label>
            <div className="bg-gray-50 p-3 rounded border max-h-40 overflow-y-auto">
              {allOperations.map(operation => (
                <div key={operation.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`operation-${operation.id}`}
                    checked={selectedOperations.includes(operation.id)}
                    onChange={() => handleSelectOperation(operation.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`operation-${operation.id}`}>{operation.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded"
            onClick={findBestCoolants}
            disabled={!waterHardness || selectedMaterials.length === 0 || selectedOperations.length === 0}
          >
            Znajdź najlepsze chłodziwa
          </button>
        </div>
        
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Wyniki</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Nazwa chłodziwa</th>
                    <th className="py-2 px-4 border-b">Zakres twardości</th>
                    <th className="py-2 px-4 border-b">Zawartość oleju</th>
                    <th className="py-2 px-4 border-b">Dopasowanie do materiałów</th>
                    <th className="py-2 px-4 border-b">Dopasowanie do obróbki</th>
                    <th className="py-2 px-4 border-b">Wynik ogólny</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((coolant, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 border-b font-medium">{coolant.name}</td>
                      <td className="py-3 px-4 border-b text-center">{coolant.hardnessRange}</td>
                      <td className="py-3 px-4 border-b text-center">{coolant.oilPercent}%</td>
                      <td className="py-3 px-4 border-b text-center">
                        {selectedMaterials.map(materialId => (
                          <div key={materialId} className="flex justify-between">
                            <span>{allMaterials.find(m => m.id === materialId).name}:</span>
                            <span>{renderRating(coolant.materials[materialId])}</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        {selectedOperations.map(operationId => (
                          <div key={operationId} className="flex justify-between">
                            <span>{allOperations.find(o => o.id === operationId).name}:</span>
                            <span>{renderRating(coolant.operationTypes[operationId])}</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4 border-b text-center font-bold">
                        {coolant.totalScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {waterHardness && selectedMaterials.length > 0 && selectedOperations.length > 0 && results.length === 0 && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded">
            Nie znaleziono pasujących chłodziw. Spróbuj zmienić kryteria wyszukiwania.
          </div>
        )}
      </div>
    );
  };

  // Panel handlowca
  const SalesRepPanel = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({
      date: new Date().toISOString().split('T')[0],
      zones: Array(7).fill().map(() => ({
        product: '',
        concentration: '',
        conductivity: '',
        temperature: '',
        ph: ''
      }))
    });
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [newClientName, setNewClientName] = useState('');
    
    // Pobierz klientów danego handlowca
    const fetchClients = async () => {
      try {
        const snapshot = await clientsCollection
          .where("salesRepId", "==", currentUser.id)
          .get();
        
        const clientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setClients(clientsData);
      } catch (error) {
        console.error("Błąd podczas pobierania klientów:", error);
      }
    };
    
    // Pobierz raporty dla wybranego klienta
    const fetchReports = async (clientId) => {
      try {
        const snapshot = await reportsCollection
          .where("clientId", "==", clientId)
          .orderBy("date", "desc")
          .get();
        
        const reportsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReports(reportsData);
      } catch (error) {
        console.error("Błąd podczas pobierania raportów:", error);
      }
    };
    
    // Dodaj nowego klienta
    const addClient = async () => {
      if (newClientName.trim() === '') return;
      
      try {
        await clientsCollection.add({
          name: newClientName,
          salesRepId: currentUser.id,
          createdAt: new Date()
        });
        
        fetchClients();
        setNewClientName('');
        setShowAddClientModal(false);
      } catch (error) {
        console.error("Błąd podczas dodawania klienta:", error);
      }
    };
    
    // Dodaj nowy raport
    const addReport = async () => {
      if (!selectedClient) return;
      
      try {
        await reportsCollection.add({
          clientId: selectedClient.id,
          salesRepId: currentUser.id,
          date: newReport.date,
          zones: newReport.zones,
          createdAt: new Date()
        });
        
        fetchReports(selectedClient.id);
        setNewReport({
          date: new Date().toISOString().split('T')[0],
          zones: Array(7).fill().map(() => ({
            product: '',
            concentration: '',
            conductivity: '',
            temperature: '',
            ph: ''
          }))
        });
      } catch (error) {
        console.error("Błąd podczas dodawania raportu:", error);
      }
    };
    
    // Aktualizuj dane strefy w nowym raporcie
    const updateZoneData = (index, field, value) => {
      const updatedZones = [...newReport.zones];
      updatedZones[index] = {
        ...updatedZones[index],
        [field]: value
      };
      setNewReport({
        ...newReport,
        zones: updatedZones
      });
    };
    
    // Efekt przy pierwszym ładowaniu
    useEffect(() => {
      fetchClients();
    }, []);
    
    // Efekt przy zmianie wybranego klienta
    useEffect(() => {
      if (selectedClient) {
        fetchReports(selectedClient.id);
      }
    }, [selectedClient]);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Panel Handlowca</h2>
        
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Klienci</h3>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                onClick={() => setShowAddClientModal(true)}
              >
                Dodaj klienta
              </button>
            </div>
            <div className="bg-gray-50 p-3 rounded border max-h-96 overflow-y-auto">
              {clients.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Brak klientów</p>
              ) : (
                clients.map(client => (
                  <div 
                    key={client.id}
                    className={`p-2 mb-1 rounded cursor-pointer ${selectedClient?.id === client.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.name}
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            {selectedClient ? (
              <>
                <h3 className="text-lg font-medium mb-4">Raporty - {selectedClient.name}</h3>
                
                <div className="mb-6 p-4 border rounded-md bg-gray-50">
                  <h4 className="text-md font-medium mb-3">Nowy Raport</h4>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data wizyty</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={newReport.date}
                      onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Parametry stref</h5>
                    {newReport.zones.map((zone, index) => (
                      <div key={index} className="mb-4 p-3 bg-white rounded shadow-sm">
                        <h6 className="font-medium mb-2">Strefa {index + 1}</h6>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          <div>
                            <label className="block text-xs text-gray-600">Produkt</label>
                            <select
                              className="w-full p-1 border rounded text-sm"
                              value={zone.product}
                              onChange={(e) => updateZoneData(index, 'product', e.target.value)}
                            >
                              <option value="">Wybierz produkt</option>
                              <option value="woda_sieciowa">Woda sieciowa</option>
                              <option value="woda_demi">Woda DEMI</option>
                              {products.map(product => (
                                <option key={product.id} value={product.name}>{product.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600">Stężenie (%)</label>
                            <input
                              type="number"
                              className="w-full p-1 border rounded text-sm"
                              value={zone.concentration}
                              onChange={(e) => updateZoneData(index, 'concentration', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600">Przewodność (μS/cm)</label>
                            <input
                              type="number"
                              className="w-full p-1 border rounded text-sm"
                              value={zone.conductivity}
                              onChange={(e) => updateZoneData(index, 'conductivity', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600">Temperatura (°C)</label>
                            <input
                              type="number"
                              className="w-full p-1 border rounded text-sm"
                              value={zone.temperature}
                              onChange={(e) => updateZoneData(index, 'temperature', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600">pH</label>
                            <input
                              type="number"
                              step="0.1"
                              className="w-full p-1 border rounded text-sm"
                              value={zone.ph}
                              onChange={(e) => updateZoneData(index, 'ph', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                      onClick={addReport}
                    >
                      Zapisz raport
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-3">Historia raportów</h4>
                  {reports.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Brak historii raportów</p>
                  ) : (
                    <div className="space-y-4">
                      {reports.map(report => (
                        <div key={report.id} className="p-4 border rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Raport z dnia {new Date(report.date).toLocaleDateString()}</h5>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="py-2 px-3 border-b text-left text-xs">Strefa</th>
                                  <th className="py-2 px-3 border-b text-left text-xs">Produkt</th>
                                  <th className="py-2 px-3 border-b text-center text-xs">Stężenie (%)</th>
                                  <th className="py-2 px-3 border-b text-center text-xs">Przewodność</th>
                                  <th className="py-2 px-3 border-b text-center text-xs">Temperatura</th>
                                  <th className="py-2 px-3 border-b text-center text-xs">pH</th>
                                </tr>
                              </thead>
                              <tbody>
                                {report.zones.map((zone, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-3 border-b">{index + 1}</td>
                                    <td className="py-2 px-3 border-b">{zone.product || '-'}</td>
                                    <td className="py-2 px-3 border-b text-center">{zone.concentration || '-'}</td>
                                    <td className="py-2 px-3 border-b text-center">{zone.conductivity || '-'}</td>
                                    <td className="py-2 px-3 border-b text-center">{zone.temperature || '-'}</td>
                                    <td className="py-2 px-3 border-b text-center">{zone.ph || '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Wybierz klienta z listy, aby wyświetlić raporty</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Modal dodawania klienta */}
        {showAddClientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Dodaj nowego klienta</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa firmy</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Wprowadź nazwę firmy"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  onClick={() => setShowAddClientModal(false)}
                >
                  Anuluj
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  onClick={addClient}
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Panel administratora do zarządzania handlowcami i przeglądania raportów
  const AdminPanel = () => {
    const [salesReps, setSalesReps] = useState([]);
    const [clients, setClients] = useState([]);
    const [reports, setReports] = useState([]);
    const [selectedSalesRep, setSelectedSalesRep] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'salesRep' });

    // Pobierz handlowców
    const fetchSalesReps = async () => {
      try {
        const snapshot = await usersCollection
          .where("role", "==", "salesRep")
          .get();
        
        const salesRepsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSalesReps(salesRepsData);
      } catch (error) {
        console.error("Błąd podczas pobierania handlowców:", error);
      }
    };
    
    // Pobierz klientów danego handlowca
    const fetchClients = async (salesRepId) => {
      try {
        const snapshot = await clientsCollection
          .where("salesRepId", "==", salesRepId)
          .get();
        
        const clientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setClients(clientsData);
        setSelectedClient(null);
        setReports([]);
      } catch (error) {
        console.error("Błąd podczas pobierania klientów:", error);
      }
    };
    
    // Pobierz raporty dla wybranego klienta
    const fetchReports = async (clientId) => {
      try {
        const snapshot = await reportsCollection
          .where("clientId", "==", clientId)
          .orderBy("date", "desc")
          .get();
        
        const reportsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReports(reportsData);
      } catch (error) {
        console.error("Błąd podczas pobierania raportów:", error);
      }
    };
    
    // Dodaj nowego handlowca
    const addSalesRep = async () => {
      if (newUser.name.trim() === '' || newUser.email.trim() === '' || newUser.password.trim() === '') {
        return;
      }
      
      try {
        // W rzeczywistym systemie hasło powinno być hashowane i nie przechowywane bezpośrednio
        await usersCollection.add({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: "salesRep",
          createdAt: new Date()
        });
        
        fetchSalesReps();
        setNewUser({ name: '', email: '', password: '', role: 'salesRep' });
        setShowAddUserModal(false);
      } catch (error) {
        console.error("Błąd podczas dodawania handlowca:", error);
      }
    };
    
    // Efekt przy pierwszym ładowaniu
    useEffect(() => {
      fetchSalesReps();
    }, []);
    
    // Efekty przy zmianie wybranego handlowca i klienta
    useEffect(() => {
      if (selectedSalesRep) {
        fetchClients(selectedSalesRep.id);
      }
    }, [selectedSalesRep]);
    
    useEffect(() => {
      if (selectedClient) {
        fetchReports(selectedClient.id);
      }
    }, [selectedClient]);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Panel Administratora</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Handlowcy</h3>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                onClick={() => setShowAddUserModal(true)}
              >
                Dodaj handlowca
              </button>
            </div>
            <div className="bg-gray-50 p-3 rounded border max-h-96 overflow-y-auto">
              {salesReps.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Brak handlowców</p>
              ) : (
                salesReps.map(salesRep => (
                  <div 
                    key={salesRep.id}
                    className={`p-2 mb-1 rounded cursor-pointer ${selectedSalesRep?.id === salesRep.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedSalesRep(salesRep)}
                  >
                    {salesRep.name}
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Klienci</h3>
            <div className="bg-gray-50 p-3 rounded border max-h-96 overflow-y-auto">
              {!selectedSalesRep ? (
                <p className="text-gray-500 text-center py-4">Wybierz handlowca</p>
              ) : clients.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Brak klientów</p>
              ) : (
                clients.map(client => (
                  <div 
                    key={client.id}
                    className={`p-2 mb-1 rounded cursor-pointer ${selectedClient?.id === client.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.name}
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Raporty</h3>
            <div className="bg-gray-50 p-3 rounded border max-h-96 overflow-y-auto">
              {!selectedClient ? (
                <p className="text-gray-500 text-center py-4">Wybierz klienta</p>
              ) : reports.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Brak raportów</p>
              ) : (
                reports.map(report => (
                  <div key={report.id} className="p-3 mb-2 bg-white rounded shadow-sm">
                    <h4 className="font-medium mb-2">Raport z dnia {new Date(report.date).toLocaleDateString()}</h4>
                    {report.zones.some(zone => zone.product) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="py-1 px-2 text-xs text-left">Strefa</th>
                              <th className="py-1 px-2 text-xs text-left">Produkt</th>
                              <th className="py-1 px-2 text-xs text-center">Stęż. (%)</th>
                              <th className="py-1 px-2 text-xs text-center">Przew.</th>
                              <th className="py-1 px-2 text-xs text-center">Temp.</th>
                              <th className="py-1 px-2 text-xs text-center">pH</th>
                            </tr>
                          </thead>
                          <tbody>
                            {report.zones.filter(zone => zone.product).map((zone, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-1 px-2 text-xs">{index + 1}</td>
                                <td className="py-1 px-2 text-xs">{zone.product}</td>
                                <td className="py-1 px-2 text-xs text-center">{zone.concentration || '-'}</td>
                                <td className="py-1 px-2 text-xs text-center">{zone.conductivity || '-'}</td>
                                <td className="py-1 px-2 text-xs text-center">{zone.temperature || '-'}</td>
                                <td className="py-1 px-2 text-xs text-center">{zone.ph || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Brak danych o strefach</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Modal dodawania handlowca */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Dodaj nowego handlowca</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imię i nazwisko</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="Wprowadź imię i nazwisko"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="Wprowadź adres email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    placeholder="Wprowadź hasło"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Anuluj
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  onClick={addSalesRep}
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Modal logowania
  const LoginModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Logowanie</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})}
                placeholder="Wprowadź adres email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})}
                placeholder="Wprowadź hasło"
              />
            </div>
          </div>
          {loginError && (
            <p className="text-red-500 mt-2">{loginError}</p>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              onClick={() => setLoginModalOpen(false)}
            >
              Anuluj
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Zaloguj
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main layout with navigation
  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Header with logo */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img 
            src="/api/placeholder/400/150"
            alt="Haug Chemie Logo"
            className="h-16 object-contain"
          />
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{currentUser.name} ({currentUser.role === 'admin' ? 'Administrator' : 'Handlowiec'})</span>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Wyloguj
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() => setLoginModalOpen(true)}
              >
                Zaloguj
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Navigation tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap -mx-2 mb-6">
          {/* Zawsze widoczne zakładki */}
          <div className="px-2 w-full md:w-1/5 mb-4 md:mb-0">
            <button
              className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'chemicalConsumption' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('chemicalConsumption')}
            >
              Kalkulator zużycia chemii
            </button>
          </div>
          <div className="px-2 w-full md:w-1/5 mb-4 md:mb-0">
            <button
              className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'volumeCalculator' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('volumeCalculator')}
            >
              Kalkulator objętości
            </button>
          </div>
          <div className="px-2 w-full md:w-1/5 mb-4 md:mb-0">
            <button
              className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'concentrationCalculator' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('concentrationCalculator')}
            >
              Uzupełnianie stężenia
            </button>
          </div>
          <div className="px-2 w-full md:w-1/5 mb-4 md:mb-0">
            <button
              className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'chlodziwaSelektor' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('chlodziwaSelektor')}
            >
              Dopasuj chłodziwo
            </button>
          </div>
          
          {/* Zakładki dostępne po zalogowaniu */}
          {currentUser && (
            <>
              {currentUser.role === 'admin' && (
                <div className="px-2 w-full md:w-1/5">
                  <button
                    className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'adminPanel' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => setActiveTab('adminPanel')}
                  >
                    Panel Administratora
                  </button>
                </div>
              )}
              {currentUser.role === 'salesRep' && (
                <div className="px-2 w-full md:w-1/5">
                  <button
                    className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'salesRepPanel' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => setActiveTab('salesRepPanel')}
                  >
                    Panel Handlowca
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Content area */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {activeTab === 'chemicalConsumption' && <ChemicalConsumptionCalculator />}
          {activeTab === 'volumeCalculator' && <VolumeCalculator />}
          {activeTab === 'concentrationCalculator' && <ConcentrationCalculator />}
          {activeTab === 'chlodziwaSelektor' && <CoolantSelector />}
          {activeTab === 'adminPanel' && currentUser?.role === 'admin' && <AdminPanel />}
          {activeTab === 'salesRepPanel' && currentUser?.role === 'salesRep' && <SalesRepPanel />}
          {activeTab === 'productManagement' && currentUser?.role === 'admin' && <ProductManagement />}
        </div>
      </div>
      
      {/* Modals */}
      {loginModalOpen && <LoginModal />}
    </div>
  );
};

// Dodaj ten kod przed renderowaniem aplikacji
// Inicjalizacja domyślnych danych
const initializeApp = async () => {
  try {
    // Sprawdź czy są produkty
    const productsSnapshot = await db.collection("products").get();
    if (productsSnapshot.empty) {
      // Dodaj domyślne produkty
      const defaultProducts = [
        { name: "eska®clean 1001", consumption: 180 },
        { name: "eska®clean 2250", consumption: 150 },
        { name: "eska®strip H 365A", consumption: 220 },
        { name: "eska®phos 2023", consumption: 160 },
        { name: "eska®phos 3045", consumption: 190 }
      ];
      
      for (const product of defaultProducts) {
        await db.collection("products").add(product);
      }
      console.log("Dodano domyślne produkty");
    }
    
    // Sprawdź czy jest konto administratora
    const adminSnapshot = await db.collection("users").where("role", "==", "admin").get();
    if (adminSnapshot.empty) {
      await db.collection("users").add({
        name: "Administrator",
        email: "admin@haugchemie.com",
        password: "admin123",
        role: "admin",
        createdAt: new Date()
      });
      console.log("Utworzono domyślne konto administratora");
    }
  } catch (error) {
    console.error("Błąd inicjalizacji:", error);
  }
};

initializeApp().then(() => {
  ReactDOM.render(<HaugChemieApp />, document.getElementById('root'));
});
