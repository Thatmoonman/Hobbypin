# Hobbypin

![logo](./frontend/public/Hobbypinlogo.png)

## Background

[Hobbypin](https://hobbypin.onrender.com/) is a [Pinterest](https://www.pinterest.com/) clone. Pinterest is website for idea visualization that allows the user to group different pictures with descriptions (called "pins") within "boards". These "boards" serve as a place to keep all of these "pins" together so they can be viewed any user. Hobbypin is also a place for keeping what inspires you organized and in one place.

## Technologies

* Javascript
* React
* Redux
* Ruby
* Ruby Rails
* PostgreSQL
* AWS S3
* Webpack
* Render

## 2 FEATURES

### Splash page animations and snapping
![splash1](./app/assets/Splash.gif)
![splash2](./app/assets/Splash2.gif)

### Pin Comments
![comment](./app/assets/comments.gif)

### Board updating and deleting
![board](./app/assets/updateboards.gif)

## CODE SNIPPET MARKDOWN

### Splash page keyframe animations
I utilized a custom keyframe animation to simulate the fade-in/fade-out effect for photos and part of the header on the splash page.

```css
@keyframes slide-in-header {
    0% {
        transform: translateY(20%);
    }
    100% {
        transform: translateY(-0%);
        opacity: 1;
    }
}

@keyframes slide-out-header {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-20%);
        opacity: 0;
    }
}

.foodHeader {
    color: orchid;
    animation: 1s ease-out .3s 1 forwards slide-in-header, 1s ease-out 5s 1 forwards slide-out-header;
    opacity: 0;
}

.travelHeader {
    color: orangered;
    animation: 1s ease-out .3s 1 forwards slide-in-header, 1s ease-out 5s 1 forwards slide-out-header;
    opacity: 0;
}
```

### Board cover photos and pin count
On the user's profile page, you can see each board you have created with the number of pins that have been attached to it. Each board will use its first pin as a cover photo or the user's profile picture if there are no pins yet. I utilized the `has_many :pins, through: pinned_boards` relationship to grab that information in my boards index jbuilder views.

```ruby
@boards.each do |board|
    json.set! board.id do
        json.extract! board, :id, :title, :user_id, :description
        json.length board.pins.length
        json.coverPhoto url_for(board.pins.first.photo) if board.pins.length > 0 
    end
end
```
```js
const BoardIndexItems = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const boards = useSelector(getBoards)

    useEffect(() => {
        dispatch(fetchBoards(userId))
    }, [userId])

    return (
        <>
            {boards.map(board => <BoardIndexItem key={board.id} board={board}/> )}
        </>
    )
}

const BoardIndexItem = (props) => { 
    
    const { userId } = useParams();
    const user = useSelector(getUser(userId))
    
    const board = props.board

    return (
        
        <Link to={`/users/${board.userId}/boards/${board.id}`} className="boardIdxItem">
            <img src={board.coverPhoto ? board.coverPhoto : user.profilePic} alt=""/>
            <h2>{board.title}</h2>
            <p>{board.length} pins</p>
        </Link>
    )
}
```
