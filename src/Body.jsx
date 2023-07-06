import React from "react"
import axios from "axios"

function Body() {
  const [category, setCategory] = React.useState([])
  const [currentJoke, setCurrentJoke] = React.useState("Click on any of the buttons...")

  const getJoke = (currentCategory) => {
    if (currentCategory === "") {
      axios.get("https://api.chucknorris.io/jokes/random").then((res) => {
        setCurrentJoke(res.data.value)
      })
    } else {
      axios
        .get(
          `https://api.chucknorris.io/jokes/random?category=${currentCategory}`
        )
        .then((res) => {
          setCurrentJoke(res.data.value)
        })
    }
  }

  React.useEffect(() => {
    axios.get("https://api.chucknorris.io/jokes/categories").then((res) => {
      setCategory(res.data)
    })
  }, [])
  return (
    <div className="body-wrapper">
      <div className="body-radio-wrapper">
        {category.map((cat) => {
          return (
            <div className="body-button-wrapper">
              <input
                type="button"
                name="radio"
                value= {cat}
                id={cat}
                onClick={() => getJoke(cat)}
              />
            </div>

          )
        })}
      </div>

      <div className="body-joke-area">{currentJoke}</div>
    </div>
  )
}

export default Body;