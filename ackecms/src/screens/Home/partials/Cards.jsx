import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPostData } from "../../../redux/Action/action";
import Card from "../../../components/Card";
import EmptyData from "../../../components/EmptyData";
import CardModal from "./CardModal";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import useApiMutation from "../../../hooks/useApiMutation";
import useMobileView from "../../../hooks/useMobileView";
import api from "../../../api";
import CustomLoader from "../../../components/CustomLoader";
import { toast } from "react-toastify";

export default function Cards() {
  const isMobileView = useMobileView();
  const dispatch = useDispatch();

  const { cardList } = useSelector((state) => state.data);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeleteCard] = useState(null);
  const [genAi, setGenAi] = useState(null);

  const loadData = useApiMutation(
    () => {
      return api.get("/cards");
    },
    {
      autoLoad: true,
      onSuccess: (data) => {
        dispatch(loadPostData(data?.data || []));
      },
    },
  );

  const deleteMutation = useApiMutation((data) => {
    return api.delete(`/cards/${data._id}`);
  }, {
    onSuccess: () => {
      toast.success('deleted successfully!')
      loadData.mutate();
      setDeleteCard(null);
    },
  });  

  const genAiMutation = useApiMutation((data) => {
    return api.post("/cards/gen", data);
  }, {
    onSuccess: (res) => {
      toast.success('content generated successfully!')
      const generatedContent = res?.data?.choices?.[0]?.message?.content;

      if(generatedContent){
        setSelectedCard({
          title:"",
          description: generatedContent,
          aiGenerated: true,
          aiPrompt: genAi?.chat
        })
        setGenAi(null)
      }
    },
  });

  return (
    <>
    <div className="flex gap-2">
      <Button type="primary" size="md" onClick={() => setSelectedCard({})}>
        Add Post
      </Button>
      <Button type="primary" size="md" onClick={() => setGenAi({})} className="bg-green-500">
        Gen AI
      </Button>
    </div>
      <div className="w-full md:p-4">
        <div className="relative p-4 rounded-lg md:shadow-lg mb-4 grid grid-cols-1 md:grid-cols-4 gap-4  overflow-y-auto w-full pb-7 pr-3 bg-white">
          {loadData.loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center">
              <CustomLoader />
            </div>
          )}
          {!loadData.loading && (
            <>
              {cardList?.length === 0 && (
                <div className="text-center text-lg col-span-4">
                  <EmptyData />
                </div>
              )}
              {cardList?.map((item) => (
                <Card
                  key={item._id}
                  item={item}
                  onEdit={setSelectedCard}
                  onDelete={setDeleteCard}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <CardModal
        title={selectedCard?._id ? "Edit Post" : "Add Post"}
        width={isMobileView ? "95%" : "70%"}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        onSuccess={() => {
          toast.success('Content created successfully!')
          loadData.mutate();
          setSelectedCard(null);
        }}
        regen={()=>{
          setGenAi({
            chat: selectedCard?.aiPrompt,
          })
          setSelectedCard(null)
        }}
      />
      <Modal
        isOpen={Boolean(deleteCard)}
        setIsOpen={setDeleteCard}
        title={
          <span className="w-full flex">Delete post</span>
        }
        width="30%"
        isLoading={deleteMutation.loading}
      >
        <div className="text-center p-4">
          <p>Are you sure you want to delete this post?</p>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="danger"
            size="sm"
            onClick={() => {
              deleteMutation.mutate(deleteCard);
            }}
            isLoading={deleteMutation.loading}
          >
            Delete
          </Button>
          <Button type="primary" size="sm" onClick={() => (setDeleteCard(null))} disabled={deleteMutation.loading}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(genAi)}
        setIsOpen={setGenAi}
        title={
          <span className="w-full flex">Generate AI</span>
        }
        width="30%"
        isLoading={genAiMutation.loading}
      >
        <div className="text-center p-4">
          <p>Input your prompt</p>
        </div>
        <div>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Prompt"
            value={genAi?.chat}
            onChange={(e) => setGenAi({ chat: e.target.value })}
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="danger"
            size="sm"
            onClick={() => {
              genAiMutation.mutate(genAi);
            }}
            isLoading={genAiMutation.loading}
          >
            Generate
          </Button>
          <Button type="primary" size="sm" onClick={() => (setGenAi(null))} disabled={genAiMutation.loading}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
