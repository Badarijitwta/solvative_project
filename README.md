# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#Get Started

I have used vite to build this react application<br>
So to start the app<br>

Clone the repo <br>
```
git clone https://github.com/Badarijitwta/solvative_project.git
```
Use <br>
```
cd solvative_project 
```

To download all the dependencies <br>
```
npm install 
```
Create your own API key from (https://rapidapi.com/wirefreethought/api/geodb-cities/) <br>
Add it in pages>Homepage.jsx
```
const fetchCities = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          mode: "no-cors",
          credentials: "include",
          params: {
            countryIds: "IN",
            namePrefix: searchTerm,
            limit: limit || 10, // Default limit is 10
          },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "[YOUR_API_KEY]",
          },
        }
      );
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };
```

To run use <br>
```
npm run dev
```

