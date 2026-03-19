import React, { createContext } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {

  
 const calculateAge = (dob) => {

  if (!dob) return "N/A";

   const birthDate=new Date(dob)
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  // Adjust month if current date < birth date
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  // Adjust year if months negative
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} Years, ${months} Months`;
};

 





  const value = {
    calculateAge ,
    
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
