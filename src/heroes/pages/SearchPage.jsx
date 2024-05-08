import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm"
import { getHeroByName } from "../helpers"
import { HeroCard } from "../components"

export const SearchPage = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search)
    const heroes = getHeroByName(q);
    const showSearch = (q.length === 0);
    const showError = (q.length > 0) && (heroes.length === 0);
    const { searchText, onInputChange } = useForm({
        searchText: q
    })
    const onSearchSubmit = (event) => {
        event.preventDefault();
        if (searchText.trim().length <= 1) return;
        navigate(`?q=${searchText}`);
    }
    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />
                        <button className="btn btn-primary mt-2">
                            search
                        </button>
                    </form>

                </div>
                <div className="col-7">
                    <h4>Results:</h4>
                    <hr />
                    {/* {q == '' ?  
                        <div className="alert alert-primary">Search a Hero</div> 
                    :   (heroes.length == 0) && <div className="alert alert-danger">No hero with <b>{q}</b></div>
                    } */}
                    <div className="alert alert-primary animate__animated animate__fadeIn" style={{display:showSearch ? '' : 'none'}}>Search a Hero</div> 
                    <div className="alert alert-danger animate__animated animate__fadeIn" style={{display:showError ? '' : 'none'}}>No hero with <b>{q}</b></div>

                    
                    {
                        heroes.map(heroe => (
                            <HeroCard key={heroe.id} {...heroe} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
