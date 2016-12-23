// http://codepen.io/rannn505/pen/JbLEKV

// Redux todo
const TODOS_REQUEST = 'TODOS_REQUEST';
const TODOS_RESOLVE = 'TODOS_RESOLVE';
const TODOS_REJECT  = 'TODOS_REJECT';
const CREATE_TODOS_RESOLVE = 'CREATE_TODOS_RESOLVE';
const CREATE_TODOS_REJECT  = 'CREATE_TODOS_REJECT';
const UPDATE_TODOS_RESOLVE = 'UPDATE_TODOS_RESOLVE';
const UPDATE_TODOS_REJECT  = 'UPDATE_TODOS_REJECT';
const REMOVE_TODOS_RESOLVE = 'REMOVE_TODOS_RESOLVE';
const REMOVE_TODOS_REJECT  = 'REMOVE_TODOS_REJECT';

const get_todos = (params = {}) => {
  return dispatch => {
    dispatch({
      type: TODOS_REQUEST,
    })
    backand.getList('todos', params,
      response => {
        dispatch({
          type: TODOS_RESOLVE,
          payload: {
            data: response.data.data
          }
        });
      },
      error => {
        dispatch({
          type: TODOS_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}
const create_todos = (data, params = {}) => {
  return dispatch => {
    backand.create('todos', data, params,
      response => {
        // SUCCESS CALLBACK: Write your code here!
        // Use the following type, and payload structure in case of using dispatch():
        // dispatch({
        //   type: CREATE_TODOS_RESOLVE,
        //   payload: {
        //     data: DATA_TO_REDUCER
        //   }
        // });
      },
      error => {
        dispatch({
          type: CREATE_TODOS_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}
const update_todos = (id, data, params = {}) => {
  return dispatch => {
    backand.update('todos', id, data, params,
      response => {
        // SUCCESS CALLBACK: Write your code here!
        // Use the following type, and payload structure in case of using dispatch():
        // dispatch({
        //   type: UPDATE_TODOS_RESOLVE,
        //   payload: {
        //     data: DATA_TO_REDUCER
        //   }
        // });
      },
      error => {
        dispatch({
          type: UPDATE_TODOS_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}
const remove_todos = (id) => {
  return dispatch => {
    backand.remove('todos', id,
      response => {
        // SUCCESS CALLBACK: Write your code here!
        // Use the following type, and payload structure in case of using dispatch():
        // dispatch({
        //   type: REMOVE_TODOS_RESOLVE,
        //   payload: {
        //     data: DATA_TO_REDUCER
        //   }
        // });
      },
      error => {
        dispatch({
          type: REMOVE_TODOS_REJECT,
          payload: {
            error: error.data
          }
        });
      });
  };
}

const todos = (state = {}, action) => {
  switch (action.type) {
    case TODOS_REQUEST:
      return {loading: true};
    case TODOS_RESOLVE:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload.data,
        loaded: true
      });
    case TODOS_REJECT:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
        loaded: false
      });
    case CREATE_TODOS_RESOLVE:
      // Write your code here!
      // Use action.payload to access data
      // EXAMPLE:
      // return Object.assign({}, state, {
      //   data: [action.payload.data, ...state.data]
      // });
  	case CREATE_TODOS_REJECT:
      return Object.assign({}, state, {
        error: action.payload.error
      });
  	case UPDATE_TODOS_RESOLVE:
      // Write your code here!
      // Use action.payload to access data
      // EXAMPLE:
      // return Object.assign({}, state, {
      //   data: [action.payload.data, ...state.data]
      // });
  	case UPDATE_TODOS_REJECT:
      return Object.assign({}, state, {
        error: action.payload.error
      });
  	case REMOVE_TODOS_RESOLVE:
      // Write your code here!
      // Use action.payload to access data
      // EXAMPLE:
	    // let newData = state.data.filter(item => item.id != action.payload.data.id);
      // return Object.assign({}, state, {
      //   data: newData
      // });
  	case REMOVE_TODOS_REJECT:
        return Object.assign({}, state, {
          error: action.payload.error
        });
    default:
      return state;
  }
}

// Redux user
const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
const SIGNIN_RESOLVE = 'SIGNIN_RESOLVE';
const SIGNIN_REJECT  = 'SIGNIN_REJECT';
const SIGNOUT        = 'SIGNOUT';

const getUserDetails = (force) => {
  return dispatch => {
    backand.getUserDetails(response => {
      dispatch(resolve(response.data));
    },
    error => {
      dispatch(reject(error.data));
    }, force);
  };
}
const useAnonymousAuth = () => {
  return dispatch => {
    backand.useAnonymousAuth(response => {
      dispatch(resolve(response.data));
    });
  };
}
const signin = (username, password) => {
  return dispatch => {
    dispatch(request())
    backand.signin(username, password,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}
const socialSignin = (provider) => {
  return dispatch => {
    dispatch(request())
    backand.socialSignin(provider,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}
const socialSigninWithToken = (provider, token) => {
  return dispatch => {
    dispatch(request())
    backand.socialSigninWithToken(provider, token,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}
const signup = (email, password, confirmPassword, firstName, lastName) => {
  return dispatch => {
    dispatch(request())
    backand.signup(email, password, confirmPassword, firstName, lastName,
      response => {
        dispatch(resolve(response.data));
      },
      error => {
        dispatch(reject(error.data));
      });
  };
}
const signout = () => {
  return dispatch => {
    backand.signout(response => {
      dispatch({type: SIGNOUT});
    });
  };
}
const request = () => {
  return {
    type: SIGNIN_REQUEST,
  }
}
const resolve = (data) => {
  return {
    type: SIGNIN_RESOLVE,
    payload: {
      data
    }
  }
}
const reject = (error) => {
  return {
    type: SIGNIN_REJECT,
    payload: {
      error
    }
  }
}

const user = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {loading: true};
    case SIGNIN_RESOLVE:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload.data,
        loaded: true});
    case SIGNIN_REJECT:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
        loaded: false});
    case SIGNOUT:
      return {};
    default:
      return state;
  }
}

// Redux setup
let rootReducer = Redux.combineReducers({
  user,
  todos,
})
let store = Redux.createStore(rootReducer, {}, Redux.applyMiddleware(ReduxThunk.default));

// React Components
const TitleComponent = ({todoCount}) => {
  return (
    <div className="col-xs-6">
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

const UserComponent = ({user, signout}) => {
  $('[data-toggle="tooltip"]').tooltip();
  if(user.loaded) {
    $('#signin').modal('hide');
  }
  return (
    <div className="col-xs-4 col-xs-offset-2">
      <div className="row" style={{marginTop: '20px', marginBottom: '10px'}}>
        {user.loaded && (<div className="col-xs-10">
          <img style={{height: '40px'}} src='http://www.haverhill-ps.org/wp-content/uploads/sites/12/2013/11/user.png'/>
          <span>Hey, {user.data.username} </span>
        </div>)}
        <div className="col-xs-2">
          {!user.loaded && (
            <span data-toggle="tooltip" data-placement="right" title="signin" data-trigger="hover" selector="#msignin">
              <button type="button" className="btn btn-default" aria-label="signin" id="msignin" data-toggle="modal" data-target="#signin">
                <span className="glyphicon glyphicon-log-in" aria-hidden="true"/>
              </button>
            </span>
          )}
          {user.loaded && (
            <span>
              <button type="button" className="btn btn-danger" aria-label="signout" id="msignout" onClick={signout}>
                <span className="glyphicon glyphicon-log-out" aria-hidden="true"/>
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

class SigninModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'reactnative@backand.com',
      password: 'Password1'
    }
  }
  render(){
    let socialbtns = []
    let socialProviders = backand.constants.SOCIAL_PROVIDERS;
    for (var provider in socialProviders) {
      socialbtns.push(
        (<button type="button" className="btn btn-primary"
          value={socialProviders[provider].name}
          onClick={(e)=>{this.props.signin('social', e.currentTarget.value)}}
          style={{backgroundColor: socialProviders[provider].css.backgroundColor, borderColor: socialProviders[provider].css.backgroundColor}}>
          {socialProviders[provider].name}
        </button>)
      )
    }

    return (
      <div className="modal fade" style={{position: 'absolute'}} id="signin" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Signin</h4>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="header">signin with app creds</div>
                    <div className="form-group form-group-sm">
                      <label for="sigin_user" className="col-sm-2 control-label">Username</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="sigin_user"
                          value={this.state.username}  onChange={(e) => this.setState({username: e.target.value})}/>
                      </div>
                    </div>
                    <div className="form-group form-group-sm">
                      <label for="sigin_pass" className="col-sm-2 control-label">Password</label>
                      <div className="col-sm-10">
                        <input type="password" className="form-control" id="sigin_pass" value="Password1"
                          value={this.state.password}  onChange={(e) => this.setState({password: e.target.value})}/>
                      </div>
                    </div>
                    <div className="form-group form-group-sm">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" id="sigin_btn" className="btn btn-default btn-sm" onClick={()=>{this.props.signin('backand', this.state.username, this.state.password)}}>signin</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="header">sign in with socialProviders</div>
                    <div id="social_btns" className="form-group form-group-sm">
                      {socialbtns}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="header">sign in as Anonymous user</div>
                    <div className="form-group form-group-sm">
                      <button type="submit" id="anonymous_btn" className="btn btn-default btn-sm" onClick={()=>{this.props.signin()}}>signin anonymously</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const TodoFormComponent = ({addTodo, user}) => {
  let input;
  return (
    <div className="col-xs-12">
      <form onSubmit={(e) => {
          e.preventDefault();
          if(input.value) {
    				addTodo({
            	text: input.value,
            	creationDate: (new Date()).toISOString(),
            	completionDate: null,
            	user: user.data.userId
            });
            input.value = '';
          }
        }}>
        <input className="form-control" ref={node => {
          input = node;
        }} />
        <br />
      </form>
    </div>
  );
};

const TodoComponent = ({todo, update, remove}) => {
  return (
    <a href="#" className="list-group-item" onClick={() => {
      update(todo.id, Object.assign({}, todo, {
        completionDate: todo.completionDate ? null : (new Date()).toISOString()}))
    }}>
      <div className="row">
        <div className="col-xs-8">
            {todo.text}
        </div>
        <div className="col-xs-2">
          {todo.completionDate && (
            <img style={{height: '20px'}} src='http://www.financialripple.com/images/green_check.png'/>)}
        </div>
        <div className="col-xs-2">
          <button type="button" className="btn btn-danger" aria-label="remove" id="remove" onClick={() => {remove(todo.id)}}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
          </button>
        </div>
      </div>
    </a>
  );
}

const TodoListComponent = ({todos, update, remove}) => {
  const toRender = todos && todos.map(todo => {
    return (<TodoComponent todo={todo} key={todo.id} update={update} remove={remove}/>)
  });
  return (
    <div className="col-xs-12" style={{height: '100%'}}>
      <div className="list-group" style={{overflowY:'scroll', height: '100%'}}>
        {toRender}
      </div>
    </div>
  );
}

class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {lastUsername: ''};
  }
  componentWillMount() {
    backand.init && backand.init({
      appName: 'reactnativetodoexample',
      signUpToken: '4c128c04-7193-4eb1-8f19-2b742a2a7bba',
      anonymousToken: '2214c4be-d1b1-4023-bdfd-0d83adab8235',
      runSocket: true
    });
  }
  componentDidMount() {
    const { props: { getUserDetails, fetchTodos } } = this
    getUserDetails();
    backand.on('update_todos', (data) => {
      fetchTodos();
    });
  }
  componentWillReceiveProps(nextProps) {
    const { user, fetchTodos } = nextProps
    if (user.loaded && user.data.username != this.state.lastUsername) {
      this.setState({lastUsername: user.data.username});
      fetchTodos();
    }
  }
  render(){
    const { props: { todos, user, fetchTodos, addTodo, updateTodo, removeTodo, signin, signout } } = this
    return (
			<div>
        <div className="container" style={{position: 'fixed', top: 70, left: 0, right: 0, bottom: 0}}>
  				<div className="row" style={{position: 'absolute', top: 0, left: 0, right: 0}}>
    				<TitleComponent todoCount={todos.loaded && user.loaded ? todos.data.length : 0}/>
          	<UserComponent user={user} signout={signout}/>
   				</div>
          <div className="row" style={{position: 'absolute', top: 70, left: 0, right: 0}}>
            {(user.loaded && todos.loaded) && <TodoFormComponent addTodo={addTodo} user={user}/>}
            {user.error && <h4 style={{color: 'red'}}> {user.error} </h4>}
   				</div>
          {user.loaded && (<div className="row" style={{position: 'absolute', top: 110, left: 0, right: 0, bottom: 10}}>
            {todos.loading && <img style={{height: '50px'}} src='http://envyus.com.au/themes/envyus/images/ajax-loader.gif'/>}
            {todos.loaded && <TodoListComponent todos={todos.data} update={updateTodo} remove={removeTodo}/>}
   				</div>)}
        </div>
				<SigninModal signin={signin}/>
			</div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    todos: state.todos,
    user: state.user,
  }
}

function fetchTodos() {
  return (dispatch, getState) => {
    const { user } = getState();
    let params = {
      sort: [backand.helpers.sort.create('creationDate', backand.helpers.sort.orders.desc)],
      exclude: backand.helpers.exclude.options.all,
      pageSize: 1000000,
      pageNumber: 1,
    }
    if(user.data.userId) {
      params.filter = [backand.helpers.filter.create('user', backand.helpers.filter.operators.relation.in, user.data.userId)];
    }
    dispatch(get_todos(params));
  };
}
const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => {
      dispatch(fetchTodos())
    },
    addTodo: (data) => {
      dispatch(create_todos(data))
    },
    updateTodo: (id, data) => {
      dispatch(update_todos(id, data))
    },
    removeTodo: (id) => {
      dispatch(remove_todos(id))
    },
    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    signin: (type, ...creds) => {
      switch (type) {
        case 'backand':
          dispatch(signin(creds[0], creds[1]));
          break;
        case 'social':
          dispatch(socialSignin(creds[0]));
          break;
        default:
          dispatch(useAnonymousAuth());
      }
    },
    signout: () => {
      dispatch(signout())
    }
  }
}

let TodoAppContainer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TodoApp)

ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<TodoAppContainer />
	</ReactRedux.Provider>,
  document.getElementById('container'));
