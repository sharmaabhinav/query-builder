import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import DropDown from './components/Dropdown';
import DataTable from './components/DataTable';
import queries, { queryDetails } from "./data.js"

function App() {
  const [queryName, setQueryName] = useState(queries[0])
  const [query, setQuery] = useState(queryDetails[queryName].query)
  const [showResults, setshowResults] = useState(false);
  const [isInValidQuery, setIsInValidQuery] = useState(false);

  const handleQuerySelection = (selectedQuery) => {
    setQueryName(selectedQuery)
    setQuery(queryDetails[selectedQuery].query)
    setshowResults(false)
    setIsInValidQuery(false)
  }

  const handleQueryChange = (event) => {
    const {
      target: {
        value: query
      }
    } = event
    setQuery(query)
    setshowResults(false)
    if (query) {
      setIsInValidQuery(false)
    } else {
      setIsInValidQuery(true)
    }
  }

  const handleQueryExecution = () => {
    if (query) {
      setshowResults(true)
    }
  }

  return (
    <Stack spacing={5} padding={5}>
      <DropDown
        value={queryName}
        onSelect={handleQuerySelection}
        options={queries}
        label='Select a query'
        style={{
          width: "20%",
        }}
      />
      <TextField
        label='Enter your SQL query'
        multiline
        rows={10}
        error={isInValidQuery}
        onChange={handleQueryChange}
        value={query}
        sx={{width: '100%'}}
      />
      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          variant='contained'
          sx={{width: 220}}
          onClick={handleQueryExecution}
        >
          Execute
        </Button>
      </Stack>
      {
        showResults && <DataTable
          data={queryDetails[queryName].results}
        />
      }
    </Stack>
  );
}

export default App;
