import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { chatroomSchema } from '../utils/validation';

const CreateChatroomModal = ({ onClose, onCreate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: joiResolver(chatroomSchema),
    defaultValues: {
      title: ''
    }
  });

  const onSubmit = (data) => {
    onCreate(data.title);
    reset();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-pink-500 dark:text-white">
              Create New Chatroom
            </h3>
            <button
              onClick={onClose}
              className="text-pink-300 hover:text-pink-100 dark:hover:text-gray-300 focus:outline-none p-1 rounded-full hover:bg-blue-500 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-pink-500 dark:text-gray-300 mb-2"
              >
                Chatroom Title
              </label>
              <input
                type="text"
                id="title"
                {...register('title')}
                placeholder="Enter chatroom title"
                className="input-primary w-full py-3 px-4"
                autoFocus
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-300">{errors.title.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary px-4 py-2.5 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-4 py-2.5 text-sm font-medium"
              >
                Create Chatroom
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChatroomModal;