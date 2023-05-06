import React,{useEffect} from 'react';
import GenerateUniqueId  from 'src/components/GenerateUniqueId';

const HomePage: React.FC = () => {
  useEffect(() => {
    const startElement = document.getElementById("start");
    if (startElement) {
      startElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return <GenerateUniqueId/>

};

export default HomePage;
