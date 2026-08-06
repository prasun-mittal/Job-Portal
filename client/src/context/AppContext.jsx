import { createContext, useEffect, useState } from "react";
// import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import {useAuth, useUser} from "@clerk/clerk-react";

export const AppContext = createContext()

export const AppContextProvider =(props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()

    const [searchFilter,setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched] = useState(false);

    const [jobs,setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken,setCompanyToken] = useState(null)
    const [companyData,setCompanyData] = useState(null)

    const [userData,setuserData] = useState(null)
    const [userApplications,setuserApplications] = useState([])


    // Function to fetch job data
    const fetchJobs = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
                console.log(data.jobs);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
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

    // Function to fetch user data
    
    const fetchUserData = async () => {
    try {

        const token = await getToken();

        console.log("TOKEN:", token);

        const { data } = await axios.get(
            backendUrl + "/api/users/user",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("API RESPONSE:", data);

        if (data.success) {
            setuserData(data.user);
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        toast.error(error.message);
    }
}
    
    
    // const fetchUserData = async () => {
    //     try {
            
    //         const token = await getToken()

    //         const {data} = await axios.get(backendUrl+'/api/users/user',
    //             {headers:{Authorization:`Bearer ${token}`}})

    //         if (data.success) {
    //             setuserData(data.user)
    //         } else{
    //             toast.error(data.message)
    //         }

    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

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

    useEffect(()=>{
        if (user) {
            fetchUserData()
        }
    },[user])

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