import {useForm} from "react-hook-form";
import classNames from "classnames";

export interface SourceFormData {
    name: string
}
interface Props {
    defaultData?: SourceFormData,
    onSubmit: (SourceFormData) => void
}

export default function SourceForm({defaultData = {name: ""}, onSubmit}: Props) {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<SourceFormData>();
    return (
        <form
            className="mt-2"
            onSubmit={handleSubmit(data => {
                onSubmit({
                    name: data.name,
                });
                reset();
            })}
        >
            <div className="mb-3">
                <label className="mb-1 text-xs tracking-wide text-gold-600 w-12">
                    名前:
                </label>
                <input
                    type="text"
                    {...register("name", { required: true })}
                    className={classNames(
                        "text-sm p-2 rounded-lg border w-full shrink",
                        {
                            'bg-gold-50': !errors.name,
                            'border-gold-200': !errors.name,
                            'bg-red-50': errors.name,
                            'border-red-200': errors.name,
                        }
                    )}
                    defaultValue={defaultData.name}
                />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="focus:outline-none text-white text-sm bg-gold-500 hover:bg-gold-600 rounded-lg py-1 px-3"
                >
                    送信
                </button>
            </div>
        </form>
    )
}

