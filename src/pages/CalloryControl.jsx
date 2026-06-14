import { useState, useMemo } from "react";
import { useDebounce, useLocalStorage, useFetch } from "../hooks/hooks";
import CalloryInput from "../components/CalloryInput";
import CalloryText from "../components/CalloryText";
import CalloryTable from "../components/CalloryTable";

function CalloryControl() {
  const [fetchData, setFetchData] = useState("");
  const debounceFetchData = useDebounce(fetchData, 2000);
  const [savedProducts, setSavedProducts] = useLocalStorage("product", []);
  const [multiplier, setMultiplier] = useState(1);
  const [translatedQuery, setTranslatedQuery] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);


  const url = debounceFetchData.trim()
    ? `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(
        debounceFetchData.toLowerCase()
      )}&app_id=039197b5&app_key=eae2f879692234e422e490dfd6857958`
    : null;

  const { data, loading, error } = useFetch(url);



  const product = useMemo(() => {
    if (data?.parsed?.length > 0) {
      const food = data.parsed[0].food;
      return {
        product_name: food.label || "Неизвестный продукт",
        nutriments: {
          "energy-kcal_100g": food.nutrients?.ENERC_KCAL ?? 0,
          proteins_100g: food.nutrients?.PROCNT ?? 0,
          fat_100g: food.nutrients?.FAT ?? 0,
          carbohydrates_100g: food.nutrients?.CHOCDF ?? 0,
        },
      };
    }
    return null;
  }, [data]);


  const handleAdd = () => {
    if (product) {
      setSavedProducts((prev) => [...prev, { ...product, multiplier }]);
      setMultiplier(1);
    }
  };

  const increaseValue = () => {
    setMultiplier((prev) => prev + 1);
  };

  const calories = product
    ? (product.nutriments?.["energy-kcal_100g"] ?? 0) * multiplier
    : 0;

  return (
    <>
      <CalloryInput value={fetchData} onChange={setFetchData} />
      {/* {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error.message}</p>} */}

      {product && (
        <CalloryText
          productName={product.product_name}
          productCallory={calories}
          addToList={handleAdd}
          increaseValue={increaseValue}
        />
      )}
      <CalloryTable
        items={savedProducts}
        onDelete={(index) => setSavedProducts(prev => prev.filter((_, i) => i !== index))}
      />
    </>
  );
}

export default CalloryControl;