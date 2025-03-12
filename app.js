// Używamy React Hooks
const { useState, useEffect } = React;

// Główny komponent aplikacji
const HaugChemieApp = () => {
  const [activeTab, setActiveTab] = useState('chemicalConsumption');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Referencje do kolekcji w Firebase
  const productsCollection = db.collection("products");
  
  // Stan dla produktów
  const [products, setProducts] = useState([]);
  
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
  };
  
  // Pobierz dane przy pierwszym ładowaniu aplikacji
  useEffect(() => {
    fetchProducts();
  }, []);
  
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
  
  // Logowanie do panelu administratora
  const handleAdminLogin = () => {
    if (adminPassword === '12345') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError('');
      setActiveTab('admin');
    } else {
      setLoginError('Nieprawidłowe hasło');
    }
  };

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

  // Login Modal Component
  const LoginModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Panel administratora</h2>
          <p className="mb-4">Wprowadź hasło, aby uzyskać dostęp do panelu administracyjnego</p>
          
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Hasło administratora"
          />
          
          {loginError && (
            <p className="text-red-500 mb-4">{loginError}</p>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              onClick={() => setShowLoginModal(false)}
            >
              Anuluj
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={handleAdminLogin}
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
            src="data:image/png;base64,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"
            alt="Haug Chemie Logo"
            className="h-16 object-contain"
          />
          <div>
            {isAdmin ? (
              <div className="flex space-x-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  onClick={() => setActiveTab('admin')}
                >
                  Zarządzaj produktami
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={() => setIsAdmin(false)}
                >
                  Wyloguj
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={() => setShowLoginModal(true)}
              >
                Panel administratora
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Navigation tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap -mx-2 mb-6">
          <div className="px-2 w-full md:w-1/3 mb-4 md:mb-0">
            <button
              className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'chemicalConsumption' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('chemicalConsumption')}
            >
              Kalkulator zużycia chemii
            </button>
          </div>
          <div className="px-2 w-full md:w-1/3 mb-4 md:mb-0">
            <button
              className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'volumeCalculator' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('volumeCalculator')}
            >
              Kalkulator objętości
            </button>
          </div>
          <div className="px-2 w-full md:w-1/3">
            <button
              className={`w-full py-3 px-4 rounded-t-lg ${activeTab === 'chlodziwaSelektor' ? 'bg-white text-blue-600 font-bold shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('chlodziwaSelektor')}
            >
              Dopasuj chłodziwo
            </button>
          </div>
        </div>
        
        {/* Content area */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {activeTab === 'chemicalConsumption' && <ChemicalConsumptionCalculator />}
          {activeTab === 'volumeCalculator' && <VolumeCalculator />}
          {activeTab === 'chlodziwaSelektor' && <CoolantSelector />}
          {activeTab === 'admin' && <ProductManagement />}
        </div>
      </div>
      
      {/* Login Modal */}
      {showLoginModal && <LoginModal />}
    </div>
  );
};

// Dodaj obsługę błędów przy renderowaniu
try {
  console.log("Próba renderowania aplikacji...");
  ReactDOM.render(<HaugChemieApp />, document.getElementById('root'));
  console.log("Aplikacja wyrenderowana pomyślnie!");
} catch (error) {
  console.error("Błąd podczas renderowania aplikacji:", error);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; background: #f8d7da; color: #721c24; border-radius: 5px; margin: 20px;">
      <h2>Wystąpił błąd podczas ładowania aplikacji</h2>
      <p>${error.message}</p>
      <p>Sprawdź konsolę przeglądarki, aby uzyskać więcej informacji.</p>
    </div>
  `;
}
