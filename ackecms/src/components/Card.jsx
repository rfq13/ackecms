import DeleteIcon from "../icons/delete";
import EditIcon from "../icons/edit";
import Button from "./Button";

export default function Card(
  props = {
    item: {
      title: "",
      description: "",
    },
    onEdit: () => {},
    onDelete: () => {},
  },
) {
  const { item, onEdit, onDelete } = props;
  return (
    <div className="relative bg-card text-card-foreground p-4 rounded-lg shadow h-fit group hover:border border-card-border">
      <div className="absolute top-0 right-0 hidden group-hover:flex gap-1 mr-2">
        <Button
          size="sm"
          className="!px-0"
          type="transparent"
          onClick={() => onEdit(item)}
        >
          <EditIcon className="w-6 h-6" color="black" />
        </Button>
        <Button
          size="sm"
          className="!px-0"
          type="transparent"
          onClick={() => onDelete(item)}
        >
          <DeleteIcon className="w-5 h-5" color="black" />
        </Button>
      </div>
      <h3 className="text-md font-semibold mb-2">{item.title}</h3>
      <p 
        className="text-sm truncate">{item.description}</p>
    </div>
  );
}
