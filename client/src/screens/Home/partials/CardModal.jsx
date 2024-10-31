
import Modal from "../../../components/Modal"
import useApiMutation from "../../../hooks/useApiMutation"
import api from "../../../api"
import CardForm from "./CardForm"
import Button from "../../../components/Button";
import ReloadIcon from "../../../icons/reload";

export default function CardModal(props = {
  selectedCard: null,
  setSelectedCard: () => {},
  title: "",
  width: "70%",
  onSuccess: () => {},
  regen: ()=> {}
}){
  const { width, title, selectedCard, setSelectedCard, onSuccess, regen } = props;

  
  const postData = useApiMutation((data)=>{
    if(data?._id){
      return api.put(`/cards/${data._id}`, data);
    }
    return api.post("/cards", data);
  },{
    onSuccess,
  });

  const handleSubmit = (data, reset) => {
    postData.mutate(data);
    reset();
  }

  return <Modal
          isOpen={Boolean(selectedCard)}
          setIsOpen={setSelectedCard}
          title={title}
          width={width}
        >
          {selectedCard?.aiPrompt && <div className="p-4 bg-slate-100 rounded-md border border-gray-500 text-lg my-3 flex justify-between">
            "{selectedCard?.aiPrompt}"
            <Button
              size="sm"
              type="transparent"
              onClick={regen}
              >
                <ReloadIcon color="black" className="w-4 h-4" title="regen prompt" />
              </Button>
          </div>}
          <CardForm onSubmit={handleSubmit} loading={postData.loading} initialValues={selectedCard ?? {}} />
        </Modal>
}