import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext()

export const AppContextProvider =(props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter,setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched] = useState(false);

    const [jobs,setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken,setCompanyToken] = useState(null)
    const [companyData,setCompanyData] = useState(null)

    // Function to fetch job data
    const fetchJobs = async ()=>{
        setJobs(jobsData)
    }

    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})

            if (data.success) {
                setCompanyData(data.company)
                console.log(data);
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchJobs()

        const storeCompanyToken = localStorage.getItem('companyToken')

        if (storeCompanyToken) {
            setCompanyToken(storeCompanyToken)
        }

    },[])

    useEffect(()=>{

        if(companyToken){
            fetchCompanyData()
        }

    },[companyToken])

    const value = {
            setSearchFilter,searchFilter,
            isSearched,setIsSearched,
            jobs,setJobs,
            showRecruiterLogin,setShowRecruiterLogin,
            companyData,setCompanyData,
            companyToken,setCompanyToken,
            backendUrl,
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}