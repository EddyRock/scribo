import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
  onCreate: (folderName: string) => void;
  loading?: boolean;
}

const dialogSchema = z.object({
  folderName: z.string().min(3).max(100).trim().nonempty()
});

type DialogSchema = z.infer<typeof dialogSchema>;

function CreateNewFolder(props: IProps) {
  const [open, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<DialogSchema>({
    resolver: zodResolver(dialogSchema),
    mode: 'onChange'
  });

  const onToggleDialog = (open: boolean = false) => {
    setDialogOpen(open);
    if (!open) {
      reset();
    }
  };

  const onHandleCreateFolder = (data: DialogSchema) => {
    props.onCreate(data.folderName);
    onToggleDialog(false);
    reset();
  };

  return (
    <>
      <Button onClick={() => onToggleDialog(true)}>
        <AddIcon /> New Folder
      </Button>
      <Dialog open={open} onClose={() => onToggleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create New Folder
          <p className="text-sm text-gray-500">Enter the details for your new folder</p>
        </DialogTitle>
        <DialogContent>
          <TextField
            {...register('folderName')}
            autoFocus
            margin="dense"
            error={!!errors.folderName}
            helperText={errors.folderName?.message}
            label="Folder Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={props.loading} onClick={() => onToggleDialog(false)}>
            Cancel
          </Button>
          <Button disabled={!isValid} onClick={handleSubmit(onHandleCreateFolder)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateNewFolder;
