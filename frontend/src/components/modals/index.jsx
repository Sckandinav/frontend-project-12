import { useSelector } from 'react-redux';
import AddModalChannel from './Add.jsx';
import RemoveModalChannel from './Remove.jsx';
import RenameModalChannel from './Rename.jsx';

const modals = {
  adding: AddModalChannel,
  removing: RemoveModalChannel,
  renaming: RenameModalChannel,
};

const ShowModal = () => {
  const type = useSelector((state) => state.modal.type);

  const ComponentModal = modals[type];
  return ComponentModal === undefined ? null : <ComponentModal />;
};

export default ShowModal;
