import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Searchinput = () => {
    const [values, setvalues] = useSearch()
    const navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setvalues({ ...values, results: data })
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handlesubmit}>
                <input className="form-control me-2" type="search" placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setvalues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </div>
    )
}

export default Searchinput