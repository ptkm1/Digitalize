import React, { createContext, useState } from "react"

interface ICidadaoProps {
  barcode?: any;
  setBarcode?: any;
}


const CidadaoContext = createContext({} as ICidadaoProps)

export const CidadaoProvider: React.FC = ({ children }) => {

  const [ barcode, setBarcode ] = useState<any>()

  return(
    <CidadaoContext.Provider value={{ barcode, setBarcode }} >
      { children }
    </CidadaoContext.Provider>
  )

}

export default CidadaoContext