import { createContext } from 'react'

export const AppContext = createContext()

const AppContextProvider = ( props ) => {
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        return age; 
    }

    const convertDateFormat = (dateStr) => {
        const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // Split the input string into day, month, and year
        const [day, month, year] = dateStr.split("_");
    
        // Convert month from numeric value to short name
        const monthName = monthsShort[parseInt(month, 10) - 1];
    
        // Return the formatted date
        return `${day} ${monthName} ${year}`;
      }

    const value = {calculateAge, convertDateFormat}

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;