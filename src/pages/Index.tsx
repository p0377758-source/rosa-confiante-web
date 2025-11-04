import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para o produto ativo automaticamente
    navigate("/product");
  }, [navigate]);

  return null;
};

export default Index;
