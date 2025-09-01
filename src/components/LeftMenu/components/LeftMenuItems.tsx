import { List } from '@mui/material';
import LeftMenuItem from '@/components/LeftMenu/components/LeftMenuItem.tsx';

import type { IItem } from '@/components/LeftMenu/components/LeftMenuItem.tsx';

interface IProps {
  items: IItem[];
  onSetSelectedItem?: (item: IItem) => void;
}

function LeftMenuItems(props: IProps) {
  const onSetSelectedItem = (e: IItem) => {
    if (props.onSetSelectedItem) {
      props.onSetSelectedItem(e);
    }
  };

  return (
    <List>
      {props.items.map((item) => {
        return <LeftMenuItem item={item} key={item.text} onClick={(e) => onSetSelectedItem(e)} />;
      })}
    </List>
  );
}

export default LeftMenuItems;
