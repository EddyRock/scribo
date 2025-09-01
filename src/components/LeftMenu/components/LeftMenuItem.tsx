import { ListItem, ListItemButton, Chip, ListItemText } from '@mui/material';

export interface IItem {
  id: string | number;
  text: string | number;
  badge?: {
    count: number;
    color?: 'primary' | 'secondary' | 'error' | 'default';
    size?: 'small' | 'medium';
    variant?: 'filled' | 'outlined';
  };
}

interface IProps {
  item: IItem;
  disablePadding?: boolean;
  onClick?: (item: IItem) => void;
}

function LeftMenuItem(props: IProps = { item: { text: '' }, disablePadding: false }) {
  const getItemContent = (item: IItem) => {
    const { text = '', badge = { color: 'info', count: 0, size: 'small', variant: 'filled' } } =
      item ?? {};

    if (text && badge) {
      return (
        <ListItemButton>
          <ListItemText primary={text} />

          <Chip label={badge.count} size={badge.size} color={badge.color} variant={badge.variant} />
        </ListItemButton>
      );
    }

    return (
      <ListItemButton>
        <ListItemText primary={text} />
      </ListItemButton>
    );
  };
  const onClickHandler = () => {
    if (props.onClick) {
      props.onClick(props.item);
    }
  };

  return (
    <ListItem onClick={() => onClickHandler()} disablePadding={props.disablePadding}>
      {getItemContent(props.item)}
    </ListItem>
  );
}

export default LeftMenuItem;
