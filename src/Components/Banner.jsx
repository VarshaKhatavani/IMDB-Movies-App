import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton  from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Banner(){

    let [movieObj, setMovieObj] = useState({});

    const[loading,setLoading] = useState(true);   
    const[textLoader,setTextLoader] = useState(true);    
 

    if (loading) {
        setTimeout(()=>{
            setLoading(false);            
        },1000);        
    }

    if (textLoader) {
        setTimeout(()=>{
            setTextLoader(false);            
        },1000);        
    }
    
    // without useEffect it will render again & again 
    // as upon changing the state component gets render then again axios get the request & so on 
    useEffect(()=>{
        axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=c4503da08fd450674fc73bc1114a40ee")
        .then(function(response){
            console.log(response.data.results);
            let movies = response.data.results;
            let randomMovies = movies[Math.floor(20 * Math.random())];
            console.log(randomMovies);
            setMovieObj(randomMovies);
        });
    },[])

    // in console it was showing error so added check if data is there then only renders
    if(movieObj.poster_path === undefined){
        return <><Skeleton height={400} className="h-screen w-auto"/></>
    }

    // bg-pattern , h-screen  in class
    return(
        <>
            {
                loading ? ( <Skeleton height={400} /> ) : (                    
                    <div className="h-[70vh] bg-cover bg-center bg-no-repeat flex items-end" style = {{backgroundImage:`url(http://image.tmdb.org/t/p/original/${movieObj.poster_path})`}} >                         
                       <div className="bg-stone-900/60 w-full p-2 text-center text-white">  
                            { textLoader ? ( <Skeleton baseColor="colors.grey" width={10} height={10} containerClassName="bg-stone-900/60 w-full p-2" /> ) 
                            : ( movieObj.name ) 
                            }
                        </div> 
                    </div>
                )
            }
        </>
    )
}