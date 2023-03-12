import './Modals.scss';
import '../../base/buttons.scss';

const DeleteModal = ({
  setIsDeleteOpen,
  selectedPost,
  allPosts,
  setPosts,
}: {
  setIsDeleteOpen: any;
  selectedPost: Posts | any;
  allPosts: Posts[];
  setPosts: any;
}) => {
  const deletePost = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => allPosts.filter((post) => post.id !== selectedPost.id))
      .then((posts) => setPosts(posts))
      .catch((err) => console.error(err.message));
  };

  return (
    <section>
      <section className="darkBG" onClick={() => setIsDeleteOpen(false)} />
      <section className="centered">
        <section className="deleteModal">
          <section className="modalHeader">
            <h5 className="heading">Delete</h5>
          </section>
          <button className="closeBtn" onClick={() => setIsDeleteOpen(false)}>
            X
          </button>
          <section className="modalContent">Are you sure you want to delete the item?</section>
          <section className="modalActions">
            <section className="actionsContainer">
              <button
                className="secondaryButton"
                onClick={() => {
                  deletePost(selectedPost.id);
                  setIsDeleteOpen(false);
                }}
              >
                Delete
              </button>
              <button className="primaryButton" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </button>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

const ViewModal = ({ setIsViewOpen, selectedPost }: { setIsViewOpen: any; selectedPost: Posts | any }) => {
  return (
    <section>
      <section className="darkBG" onClick={() => setIsViewOpen(false)} />
      <section className="centered">
        <section className="viewModal">
          <section className="modalHeader">
            <h5 className="heading">{selectedPost.title}</h5>
          </section>
          <button className="closeBtn" onClick={() => setIsViewOpen(false)}>
            X
          </button>
          <section className="modalContent">{selectedPost.body}</section>
        </section>
      </section>
    </section>
  );
};

export { DeleteModal, ViewModal };
