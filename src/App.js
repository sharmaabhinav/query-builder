import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import DropDown from './components/Dropdown';
import DataTable from './components/DataTable';
import FormDialog from './components/FormDialog';
import queries, { queryDetails } from "./data.js"
import exportToFile from './util';

function App() {
  const [queryOptions, setQueryOptions] = useState(queries)
  const [queryData, setQueryData] = useState(queryDetails)
  const [queryName, setQueryName] = useState(queryOptions[0]);
  const [query, setQuery] = useState(queryData[queryName].query);
  const [showResults, setShowResults] = useState(false);
  const [isInValidQuery, setIsInValidQuery] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleQuerySelection = (selectedQuery) => {
    setQueryName(selectedQuery)
    setQuery(queryData[selectedQuery].query)
    setShowResults(false)
    setIsInValidQuery(false)
  }

  const handleQueryChange = (event) => {
    const {
      target: {
        value: query
      }
    } = event

    setQuery(query)
    setShowResults(false)
    if (query) {
      setIsInValidQuery(false)
    } else {
      setIsInValidQuery(true)
    }
  }

  const handleQueryExecution = () => {
    if (query) {
      setShowResults(true)
    }
  }

  const handleExport = () => {
    exportToFile(query, `${queryName}.sql`)
  }

  const onSaveDialogClose = () => {
    setShowSaveDialog(false)
  }

  const onSaveDialogOpen = () => {
    if (!isInValidQuery) {
      setShowSaveDialog(true)
    }
  }

  const onQuerySave = (name) => {
    setShowSaveDialog(false)
    setQueryName(name)
    setQueryOptions((prevOptions) => [...prevOptions, name])
    setQueryData((prevData) => {
      return {
        ...prevData,
        [name]: {
          query,
          results: queryData[queryName].results
        }
      }
    })
  }

  return (
    <>
      <Stack spacing={5} padding={5}>
        <DropDown
          value={queryName}
          onSelect={handleQuerySelection}
          options={queryOptions}
          label='Select a query'
          style={{
            width: "25%",
          }}
        />
        <TextField
          label='Enter your SQL query'
          placeholder='Enter your SQL query'
          multiline
          rows={10}
          error={isInValidQuery}
          onChange={handleQueryChange}
          value={query}

        />
        <Stack
          direction="row"
          justifyContent="flex-end"
        >
          <Button
            variant='outlined'
            sx={
              {
                width: 220,
                mr: 3
              }
            }
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant='outlined'
            sx={
              {
                width: 220 ,
                mr: 3
              }
            }
            onClick={onSaveDialogOpen}
          >
            Save
          </Button>
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
            data={queryData[queryName].results}
          />
        }
      </Stack>
      <FormDialog
        title="Enter query name"
        helpText="To save the query, please enter your query name here. We will save it for later execution."
        inputLabel="Enter query name"
        inputPlaceHolder="Enter query name"
        show={showSaveDialog}
        onClose={onSaveDialogClose}
        onSave={onQuerySave}
      />
    </>
  );
}

export default App;
