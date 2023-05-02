import './styles.css';

export const PostCard = ({ title, body, id, cover }) => (
  <div className='post_card'>
    <img src={cover} alt={title} />
    <div className='post_content'>
      <h2>{title} {id}</h2>
      <p>{body}</p>
    </div>
  </div>
);
