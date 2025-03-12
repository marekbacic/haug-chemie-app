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
            src="/api/placeholder/400/150"
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

// Renderuj aplikację w kontenerze root
ReactDOM.render(<HaugChemieApp />, document.getElementById('root'));