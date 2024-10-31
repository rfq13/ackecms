
import { useForm } from "react-hook-form"
import Button from "../../../components/Button"

function CardForm(props = {
  onSubmit: () => {},
  loading: false,
  initialValues: {},
}){
  const { onSubmit, loading, initialValues } = props;
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  })

  return <form onSubmit={handleSubmit((data)=> onSubmit(data, reset))} className="space-y-4 my-4">
      <div>
        <label className="sr-only" htmlFor="title">Title</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Name"
          id="title"
          {...register("title", { required: true })}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <span role="alert" className="text-red-500 text-sm">
            This field is required
          </span>
        )}
      </div>

      <div>
        <label className="sr-only" htmlFor="description">Description</label>

        <textarea
          className="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="description"
          rows="8"
          id="description"
          {...register("description", { required: true })}
          aria-invalid={errors.description ? "true" : "false"}
        ></textarea>
        {errors.description && (
          <span role="alert" className="text-red-500 text-sm">
            This field is required
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Button type="primary" size="md" htmlType="submit" isLoading={loading}>
          {
            initialValues?._id ? "Update" : "Create"
          } Post
        </Button>
      </div>
    </form>
}

export default CardForm