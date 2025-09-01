import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface IProps {
  search: string;
  onUpdateSearch: (search: string) => void;
}

function LeftMenuSearch(props: IProps) {
  return (
    <div className="w-full p-4 border-b border-gray-100">
      <h3 className="text-xl font-medium text-black">Notes</h3>
      <TextField
        className="!mt-2"
        value={props.search}
        onChange={(e) => props.onUpdateSearch(e.target.value)}
        placeholder="Search notes..."
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }
        }}
      />
    </div>
  );
}

export default LeftMenuSearch;
