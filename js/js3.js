let userindex = "", p = window.location.href.split("/")[window.location.href.split("/").length-1].split(".")[0], a = "home", b = "blog", c = "profile", d = "account", e = "signout";

if(window.location.href.split("=")[1] != undefined){
	/*--set userid to anchor tags on nav-bar--*/
	userindex = window.location.href.split("=")[1];
	let lhref = $('.nav-link');
	for(let j = 0; j < lhref.length-1; j++){
		if(j != lhref.lhref-1){
			let linkh = $('.nav-link')[j].href;
			$('.nav-link')[j].href = linkh + "?userid=" + userindex;
		}
	}
}

if(userindex == "" && p != a && p!= e){ window.location.href = "home.html"; }

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1000,
	timerProgressBar: false
})
const ToastLoad = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	onOpen: (toast) => {
	toast.addEventListener('mouseenter', Swal.stopTimer)
	toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})

function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
switch(p){
	case a:
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(json => {
				let rand1 = [json.length];

			  	let p1, p2;
			  	let po = [];
			  	for (let i = 0; i < json.length; i++) {
			  		rand1[i] = json[i]['id'];
			  	}

			  	function randomNumber(min, max) {  
				    min = Math.ceil(min); 
				    max = Math.floor(max); 
				    return Math.floor(Math.random() * (max - min + 1)) + min; 
				}
				p1 = randomNumber(0, json.length-1);
			  	p2 = randomNumber(0, json.length-1);

			  	po[0] = json[p1]['id'];
			  	po[1] = json[p2]['id'];
			  	while(p1 == p2){
			  		p2 = randomNumber(0, json.length-1);
			  		po[1] = json[p2]['id'];
			  	}
				const posthere = $('.posthere');
				posthere.html("");
				for(let i = 0; i < po.length; i++){
					fetch('https://jsonplaceholder.typicode.com/posts?id=' + po[i])
						.then(response => response.json())
						.then(json => {
							let ph = "";
							ph += '<div class="col-md-6">';
							ph += '<h3>' + json[0]['title'] + '</h3>';
							ph += '<p>' + json[0]['body'] + '</p>';
							ph += '<p class="text-right text-muted postblogname'+i+'"></p>'
							fetch('https://jsonplaceholder.typicode.com/users?id=' + json[0]['userId'])
								.then(response => response.json())
								.then(json => {
									$('.postblogname'+i).append(json[0]['name']);
									console.log(json[0]['name'])
							});
							ph += '</div>';
							posthere.append(ph);
						});
				}
			});

		$('.loginbtn').on('submit click', function(e){
			e.preventDefault();
			let un = $('.formlogin input[name=username]').val();
			let em = $('.formlogin input[name=email]').val();
			
	        if(un.length == 0 && em.length == 0){
				Toast.fire({
				  icon: 'warning',
				  title: 'Please enter your Username and Email Address'
				})
	        }
	        else if( un.length == 0 || em.length == 0){
	            if(un.length == 0){
	            	Toast.fire({
					  icon: 'warning',
					  title: 'Please enter your Username'
					})
	            }else{
	            	Toast.fire({
					  icon: 'warning',
					  title: 'Please enter your Email Address'
					})
	            }
	        }else{
				fetch('https://jsonplaceholder.typicode.com/users')
				  .then(response => response.json())
				  .then(json => {
				  	let user = [json.length];
				  	let email = [json.length];
				  	let userid = [json.length];

				  	let u1, e1, id1;
				  	for (let i = 0; i < json.length; i++) {
				  		user[i] = json[i]['username'];
				  		email[i] = json[i]['email'];
				  		userid[i] = json[i]['id'];
				  		if(user[i] == un && email[i] == em){
				  			u1 = user[i];
				  			e1 = email[i];
				  			id1 = userid[i];
				  		}
				  	}

				  	if(u1 == un && e1 == em){
			  			ToastLoad.fire({
							icon: 'info',
							title: 'Please wait...'
						});
						setTimeout(function(){
							window.location.href = "blog.html?userid=" + id1;
						}, 3000);
						
				  	}else{
				  		Toast.fire({
						  icon: 'error',
						  title: 'Incorrect Login. Try Again'
						})
				  	}
				});
	        }
	    });

		break;
	case b:
		/*--fetch users name and show date--*/
		fetch('https://jsonplaceholder.typicode.com/users?id='+userindex)
			.then(response => response.json())
			.then(json => {
				const namehere = $('.namehere');
				namehere.html("");
				let ph = "";

				ph += '<h6 class="mb-0 text-white lh-100">'+ json[0]['name'] +'</h6>'
				let today = new Date();
				let dd = String(today.getDate()).padStart(2, '0'), mm = String(today.getMonth() + 1).padStart(2, '0'), yyyy = today.getFullYear();

				today = mm + '/' + dd + '/' + yyyy;

				ph += '<small>Welcome! Today is ' + today +'</small>';
				namehere.append(ph);
			});

		/*--fetch random posts from API--*/
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(json => {
				let rand1 = [json.length];

			  	let po = [];
			  	for (let i = 0; i < json.length; i++) {
			  		rand1[i] = json[i]['id'];
			  	}

			  	for(let i = 0; i < json.length; i++){
			  		let x = randomNumber(0, json.length-1);
			  		if(po.length < 10){
			  			if(po.length == 0){
				  			po[0] = json[x]['id'];
				  		}else{
				  			if(po.indexOf(x) < 0){
				  				po[i] = json[x]['id'];
				  			}
				  		}
			  		}
			  		else{
			  			break;
			  		}
			  	}

				const posthere = $('.randompost');
				posthere.html("");
				for(let k = 0; k < po.length-1; k++){
					fetch('https://jsonplaceholder.typicode.com/posts?id=' + po[k])
						.then(response => response.json())
						.then(json => {
							let ph = "";
							ph += '<div class="col-md-12 my-3 p-3 bg-white rounded shadow-sm">';
							ph += '<h3>' + json[0]['title'] + '</h3>';
							ph += '<p>' + json[0]['body'] + '</p>';
							ph += '<p class="text-right text-muted postblogname'+k+'"></p>'
							fetch('https://jsonplaceholder.typicode.com/users?id=' + json[0]['userId'])
								.then(response => response.json())
								.then(json => {
									$('.postblogname'+k).append(json[0]['name']);
							});

							ph += '</div>';
							posthere.append(ph);
						});
				}
			});

		/*--fetch todos from API with userindex--*/
		fetch('https://jsonplaceholder.typicode.com/todos?userId=' + userindex + '&completed=false')
			.then(response => response.json())
			.then(json => {
				const posthere1 = $('.todolist');
				posthere1.html("");
				for(let i = 0; i < json.length; i++){
					let ph = "";
					ph += '<div class="bd-callout bd-callout-info" data-id="todo-'+ json[i]['id'] +'">';
					ph += '<p>' + json[i]['title'] + '</p>';
					ph += '</div>';
					posthere1.append(ph);
				}
			});

		$('.todolist').on('click', 'div',function(e){
	        selectedDataId = $(this).data('id').split("-")[1];
			ToastLoad.fire({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  showConfirmButton: true,
			  confirmButtonColor: 'rgb(76, 174, 76)',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Done!'
			}).then((result) => {
			  if (result.value) {
			    fetch('https://jsonplaceholder.typicode.com/todos/id=' + selectedDataId, {
				    method: 'PATCH',
				    body: JSON.stringify({
				      completed: 'true'
				    }),
				    headers: {
				      "Content-type": "application/json; charset=UTF-8"
				    }
				})
				.then(response => response.json())
				.then(json => {
					ToastLoad.fire(
				      'Success!',
				      'You just completed a task!',
				      'success'
				    )
				    $(this).removeClass('bd-callout-info');
				    $(this).addClass('bd-callout-success');
				})
			  }
			})
		});
		break;
	case c:
		fetch('https://jsonplaceholder.typicode.com/posts?userId='+userindex)
			.then(response => response.json())
			.then(json => {
				const yourposthere = $('.yourposthere');
				yourposthere.html("");
				// yourposthere.closest(".loader").remove();
				let ph = "";
				for (let i = 0; i < json.length-1; i++){
					ph += '<div class="col-md-12 my-3 p-3 bg-white rounded shadow-sm">';
					ph += '<h3>' + json[i]['title'] + '</h3>';
					ph += '<p>' + json[i]['body'] + '</p>';
					ph += '</div>';
				}
				yourposthere.append(ph);
			});

		$('.blogbtn').on('submit click', function(e){
			e.preventDefault();
			let title = $('.form-blog input').val();
			let content = $('.form-blog textarea').val();
			
	        if(title.length == 0 && content.length == 0){
				Toast.fire({
				  icon: 'warning',
				  title: 'Please enter Blog Title and Content'
				})
	        }
	        else if(title.length == 0 || content.length == 0){
	            if(title.length == 0){
	            	Toast.fire({
					  icon: 'warning',
					  title: 'Please enter Blog Title'
					})
	            }else{
	            	Toast.fire({
					  icon: 'warning',
					  title: 'Please enter Blog Content'
					})
	            }
	        }else{
	        	ToastLoad.fire({
					icon: 'info',
					title: 'Please wait...'
				});
	        	fetch('https://jsonplaceholder.typicode.com/posts')
					.then(response => response.json())
					.then(json => {
						let lindex = parseInt(json[json.length-1]['id']) + 1;
						fetch('https://jsonplaceholder.typicode.com/posts/' + userindex, {
						    method: 'PUT',
						    body: JSON.stringify({
								id: lindex,
								title: title,
								body: content,
								userId: userindex
						    }),
						    headers: {
						    	"Content-type": "application/json; charset=UTF-8"
						    }
						})
						.then(response => response.json())
						.then(json => {
							ToastLoad.fire(
						      'Success!',
						      'You just posted a blog!',
						      'success'
						    )
						    setTimeout(function(){
								let repost = $('.yourposthere').html();
							  	const yourposthere = $('.yourposthere');
								yourposthere.html("");
								// yourposthere.closest(".loader").remove();
								let ph = "";
								ph += '<div class="col-md-12 my-3 p-3 bg-white rounded shadow-sm">';
								ph += '<h3>' + json['title'] + '</h3>';
								ph += '<p>' + json['body'] + '</p>';
								ph += '</div>';
								ph += repost;
								yourposthere.html(ph);

								$('.form-blog input').val("");
								$('.form-blog textarea').val("");
							}, 1000);
						  	
						})
			        })
			}
		});

		fetch('https://jsonplaceholder.typicode.com/todos?userId=' + userindex)
			.then(response => response.json())
			.then(json => {
				const posthere1 = $('.todolist');
				posthere1.html("");
				for(let i = 0; i < json.length; i++){
					let ph = "";
					if(json[i]['completed']==false){
						ph += '<div class="bd-callout bd-callout-info" data-id="todo-'+ json[i]['id'] +'">';
						ph += '<p>' + json[i]['title'] + '</p>';
						ph += '</div>';
					}else{
						ph += '<div class="bd-callout bd-callout-success" data-id="todo-'+ json[i]['id'] +'">';
						ph += '<p>' + json[i]['title'] + '</p>';
						ph += '</div>';
					}					
					posthere1.append(ph);
				}
			});

		fetch('https://jsonplaceholder.typicode.com/albums?userId='+userindex)
			.then(response => response.json())
			.then(json => {
				const youralbum = $('.youralbum');
				youralbum.html("");
				// yourposthere.closest(".loader").remove();
				let ph = "";
				
				ph += '<div class="row">'

				for(let z = json.length-1; z > json.length-3; z--){
				ph += '<div class="col-md-6">'
				ph += '<strong>' + (json[z]['title']).substr(1,20) + "..." + '</strong>';
				ph += '<div class="yourthumb'+z+'"></div>'
				fetch('https://jsonplaceholder.typicode.com/photos?albumId='+json[z]['id'])
					.then(response => response.json())
					.then(json => {
						$('.yourthumb'+z).append('<img class="mx-auto" src="' + json[0]['thumbnailUrl'] + '">');
					});
				ph += '</div>';
				}
				ph += '<a class="text-muted" href="#">View more albums</a></div>';
				youralbum.append(ph);
			});

		$('.todolist').on('click', 'div',function(e){
	        selectedDataId = $(this).data('id').split("-")[1];
			ToastLoad.fire({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  showConfirmButton: true,
			  confirmButtonColor: 'rgb(76, 174, 76)',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Done!'
			}).then((result) => {
			  if (result.value) {
			    fetch('https://jsonplaceholder.typicode.com/todos/id=' + selectedDataId, {
				    method: 'PATCH',
				    body: JSON.stringify({
				      completed: 'true'
				    }),
				    headers: {
				      "Content-type": "application/json; charset=UTF-8"
				    }
				})
				.then(response => response.json())
				.then(json => {
					ToastLoad.fire(
				      'Success!',
				      'You just completed a task!',
				      'success'
				    )
				    $(this).removeClass('bd-callout-info');
				    $(this).addClass('bd-callout-success');
				})
			  }
			})
		});
		break;
	case d:
		fetch('https://jsonplaceholder.typicode.com/users?id='+userindex)
			.then(response => response.json())
			.then(json => {
				const accounthere = $('.accounthere');
				accounthere.html("");
				let ph = "";
				//name
				ph += '<div class="media text-muted pt-3">';
				ph += '<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/><path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/></svg>';
				ph += '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin-left: 10px;">';
				ph += '<div class="d-flex justify-content-between align-items-center w-100">'
				ph += '<strong class="text-gray-dark">'+json[0]['name']+'</strong>'
				ph += '<a href="#" data-id="1">Edit</a>'
				ph += '</div>'
				ph += '<span class="d-block">Name</span>'
				ph += '</div>'
				ph += '</div>';
				
				//username
				ph += '<div class="media text-muted pt-3">';
				ph += '<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-at" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/></svg>';
				ph += '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin-left: 10px;">';
				ph += '<div class="d-flex justify-content-between align-items-center w-100">'
				ph += '<strong class="text-gray-dark">'+json[0]['username']+'</strong>'
				ph += '</div>'
				ph += '<span class="d-block">Userame</span>'
				ph += '</div>'
				ph += '</div>';

				//email
				ph += '<div class="media text-muted pt-3">';
				ph += '<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/></svg>';
				ph += '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin-left: 10px;">';
				ph += '<div class="d-flex justify-content-between align-items-center w-100">'
				ph += '<strong class="text-gray-dark">'+json[0]['email']+'</strong>'
				ph += '<a href="#" data-id="2">Edit</a>'
				ph += '</div>'
				ph += '<span class="d-block">Email</span>'
				ph += '</div>'
				ph += '</div>';

				//address
				ph += '<div class="media text-muted pt-3">';
				ph += '<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-map" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.817.613A.5.5 0 0 1 16 1v13a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 14.51l-4.902.98A.5.5 0 0 1 0 15V2a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0l4.902.98 4.902-.98a.5.5 0 0 1 .415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z"/></svg>';
				ph += '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin-left: 10px;">';
				ph += '<div class="d-flex justify-content-between align-items-center w-100">'
				ph += '<strong class="text-gray-dark">'+json[0]['address']['street'] + " " + json[0]['address']['suite'] + " " + json[0]['address']['city'] + " " + json[0]['address']['zipcode']+'</strong>'
				ph += '</div>'
				ph += '<span class="d-block">Address</span>'
				ph += '</div>'
				ph += '</div>';

				//phone
				ph += '<div class="media text-muted pt-3">';
				ph += '<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-telephone" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.925 1.745a.636.636 0 0 0-.951-.059l-.97.97c-.453.453-.62 1.095-.421 1.658A16.47 16.47 0 0 0 5.49 10.51a16.471 16.471 0 0 0 6.196 3.907c.563.198 1.205.032 1.658-.421l.97-.97a.636.636 0 0 0-.06-.951l-2.162-1.682a.636.636 0 0 0-.544-.115l-2.052.513a1.636 1.636 0 0 1-1.554-.43L5.64 8.058a1.636 1.636 0 0 1-.43-1.554l.513-2.052a.636.636 0 0 0-.115-.544L3.925 1.745zM2.267.98a1.636 1.636 0 0 1 2.448.153l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/></svg>';
				ph += '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin-left: 10px;">';
				ph += '<div class="d-flex justify-content-between align-items-center w-100">'
				ph += '<strong class="text-gray-dark">'+json[0]['phone']+'</strong>'
				ph += '<a href="#" data-id="3">Edit</a>'
				ph += '</div>'
				ph += '<span class="d-block">Phone Number</span>'
				ph += '</div>'
				ph += '</div>';

				//website
				ph += '<div class="media text-muted pt-3">';
				ph += '<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-globe2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.018 7.5h2.49c.037-1.07.189-2.087.437-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5zM3.05 3.049c.362.184.763.349 1.198.49.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.5 1.077c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.473.257 2.282.287V1.077zm0 4.014c-.91-.03-1.783-.145-2.591-.332a12.344 12.344 0 0 0-.4 2.741H7.5V5.091zm1 2.409V5.091c.91-.03 1.783-.145 2.591-.332.223.827.364 1.754.4 2.741H8.5zm-1 1H4.51c.035.987.176 1.914.399 2.741A13.596 13.596 0 0 1 7.5 10.91V8.5zm1 2.409V8.5h2.99a12.343 12.343 0 0 1-.399 2.741A13.596 13.596 0 0 0 8.5 10.91zm-1 1c-.81.03-1.577.13-2.282.287.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91zm-2.173 2.563a6.695 6.695 0 0 1-.597-.933 8.857 8.857 0 0 1-.481-1.078 8.356 8.356 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.52zM2.38 12.175c.47-.258.995-.482 1.565-.667A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.964 6.964 0 0 0 1.362 3.675zm8.293 2.297a7.01 7.01 0 0 0 2.275-1.521 8.353 8.353 0 0 0-1.197-.49 8.859 8.859 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zm.11-2.276A12.63 12.63 0 0 0 8.5 11.91v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872zm1.272-.688c.57.185 1.095.409 1.565.667A6.964 6.964 0 0 0 14.982 8.5h-2.49a13.355 13.355 0 0 1-.437 3.008zm.437-4.008h2.49a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zm-.74-3.96a8.854 8.854 0 0 0-.482-1.079 6.692 6.692 0 0 0-.597-.933c.857.355 1.63.875 2.275 1.521a8.368 8.368 0 0 1-1.197.49zm-.97.264c-.705.157-1.473.257-2.282.287V1.077c.67.204 1.335.82 1.887 1.855.143.268.276.56.395.872z"/></svg>';
				ph += '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin-left: 10px;">';
				ph += '<div class="d-flex justify-content-between align-items-center w-100">'
				ph += '<strong class="text-gray-dark">'+json[0]['website']+'</strong>'
				ph += '<a href="#" data-id="4">Edit</a>'
				ph += '</div>'
				ph += '<span class="d-block">Website</span>'
				ph += '</div>'
				ph += '</div>';

				//company
				ph += '<div class="media text-muted pt-3">';
				ph += '<svg width="2.5em" height="2.5em" viewBox="0 0 16 16" class="bi bi-briefcase" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6h-1v6a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6H0v6z"/><path fill-rule="evenodd" d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5v2.384l-7.614 2.03a1.5 1.5 0 0 1-.772 0L0 6.884V4.5zM1.5 4a.5.5 0 0 0-.5.5v1.616l6.871 1.832a.5.5 0 0 0 .258 0L15 6.116V4.5a.5.5 0 0 0-.5-.5h-13zM5 2.5A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V3h-1v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V3H5v-.5z"/></svg>';
				ph += '<div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" style="margin-left: 10px;">';
				ph += '<div class="d-flex justify-content-between align-items-center w-100">'
				ph += '<strong class="text-gray-dark">'+json[0]['company']['name'] + ", <em>" +json[0]['company']['bs'] +'</em></strong>'
				ph += '</div>'
				ph += '<span class="d-block">Company</span>'
				ph += '</div>'
				ph += '</div>';

				accounthere.append(ph);
			});	

		$('.accounthere').on('click', 'a',function(e){
		    clickedDataId = $(this).data('id');
		    switch(clickedDataId){
		    	case 1:
		    		Swal.fire({
						input: 'text',
						title: 'Update Name',
						inputPlaceholder: 'Type your name...',
						inputAttributes: {
						'aria-label': 'Enter Name'
						},
						showCancelButton: true
					}).then((result) => {
				  		if (result.value) {
				  			fetch('https://jsonplaceholder.typicode.com/users/id=' + userindex, {
							    method: 'PATCH',
							    body: JSON.stringify({
							      name: result.value
							    }),
							    headers: {
							      "Content-type": "application/json; charset=UTF-8"
							    }
							})
							.then(response => response.json())
							.then(json => {
								console.log(json)
								const accounthere1 = $(this).closest('div');
								accounthere1.html("");
								let ph = "";
								//name
								ph += '<strong class="text-gray-dark">'+json['name']+'</strong>'
								ph += '<a href="#" data-id="1">Edit</a>';

								accounthere1.append(ph)

								ToastLoad.fire(
							      'Success!',
							      'Your name has been updated!',
							      'success'
							    )
							})
				  		}
				  	})
		    		break;
		    	case 2:
		    		Swal.fire({
						input: 'email',
						title: 'Update Email',
						inputPlaceholder: 'Type your new email...',
						inputAttributes: {
						'aria-label': 'Enter Email'
						},
						showCancelButton: true
					}).then((result) => {
				  		if (result.value) {
				  			fetch('https://jsonplaceholder.typicode.com/users/id=' + userindex, {
							    method: 'PATCH',
							    body: JSON.stringify({
							      email: result.value
							    }),
							    headers: {
							      "Content-type": "application/json; charset=UTF-8"
							    }
							})
							.then(response => response.json())
							.then(json => {
								console.log(json)
								const accounthere1 = $(this).closest('div');
								accounthere1.html("");
								let ph = "";
								//name
								ph += '<strong class="text-gray-dark">'+json['email']+'</strong>'
								ph += '<a href="#" data-id="2">Edit</a>';

								accounthere1.append(ph)
								
								ToastLoad.fire(
							      'Success!',
							      'Your email has been updated!',
							      'success'
							    )
							})
				  		}
				  	})
		    		break;
		    	case 3:
			    	Swal.fire({
							input: 'text',
							title: 'Update Phone',
							inputPlaceholder: 'Type your new phone number...',
							inputAttributes: {
							'aria-label': 'Enter phone'
							},
							showCancelButton: true
						}).then((result) => {
					  		if (result.value) {
					  			fetch('https://jsonplaceholder.typicode.com/users/id=' + userindex, {
								    method: 'PATCH',
								    body: JSON.stringify({
								      phone: result.value
								    }),
								    headers: {
								      "Content-type": "application/json; charset=UTF-8"
								    }
								})
								.then(response => response.json())
								.then(json => {
									console.log(json)
									const accounthere1 = $(this).closest('div');
									accounthere1.html("");
									let ph = "";
									//name
									ph += '<strong class="text-gray-dark">'+json['phone']+'</strong>'
									ph += '<a href="#" data-id="3">Edit</a>';

									accounthere1.append(ph)
									
									ToastLoad.fire(
								      'Success!',
								      'Your phone number has been updated!',
								      'success'
								    )
								})
					  		}
					  	})
		    		break;
		    	case 4:
		    		Swal.fire({
							input: 'url',
							title: 'Update Website',
							inputPlaceholder: 'Type your new website...',
							inputAttributes: {
							'aria-label': 'Enter URL'
							},
							showCancelButton: true
						}).then((result) => {
					  		if (result.value) {
					  			fetch('https://jsonplaceholder.typicode.com/users/id=' + userindex, {
								    method: 'PATCH',
								    body: JSON.stringify({
								      website: result.value
								    }),
								    headers: {
								      "Content-type": "application/json; charset=UTF-8"
								    }
								})
								.then(response => response.json())
								.then(json => {
									console.log(json)
									const accounthere1 = $(this).closest('div');
									accounthere1.html("");
									let ph = "";
									//name
									ph += '<strong class="text-gray-dark">'+json['website']+'</strong>'
									ph += '<a href="#" data-id="4">Edit</a>';

									accounthere1.append(ph)
									
									ToastLoad.fire(
								      'Success!',
								      'Your website has been updated!',
								      'success'
								    )
								})
					  		}
					  	})
		    		break;
		    }
		});
		break;
	case e:
		$('.loginbtn').on('submit click', function(e){
			e.preventDefault();
			let un = $('.formlogin input[name=username]').val();
			let em = $('.formlogin input[name=email]').val();
			
	        if(un.length == 0 && em.length == 0){
				Toast.fire({
				  icon: 'warning',
				  title: 'Please enter your Username and Email Address'
				})
	        }
	        else if( un.length == 0 || em.length == 0){
	            haserror = true;
	            if(un.length == 0){
	            	Toast.fire({
					  icon: 'warning',
					  title: 'Please enter your Username'
					})
	            }else{
	            	Toast.fire({
					  icon: 'warning',
					  title: 'Please enter your Email Address'
					})
	            }
	        }else{
				fetch('https://jsonplaceholder.typicode.com/users')
				  .then(response => response.json())
				  .then(json => {
				  	let user = [json.length];
				  	let email = [json.length];
				  	let userid = [json.length];

				  	let u1, e1, id1;
				  	for (let i = 0; i < json.length; i++) {
				  		user[i] = json[i]['username'];
				  		email[i] = json[i]['email'];
				  		userid[i] = json[i]['id'];
				  		if(user[i] == un && email[i] == em){
				  			u1 = user[i];
				  			e1 = email[i];
				  			id1 = userid[i];
				  		}
				  	}

				  	if(u1 == un && e1 == em){
			  			ToastLoad.fire({
							icon: 'info',
							title: 'Please wait...'
						});
						setTimeout(function(){
							window.location.href = "blog.html?userid=" + id1;
						}, 3000);
						
				  	}else{
				  		Toast.fire({
						  icon: 'error',
						  title: 'Incorrect Login. Try Again'
						})
				  	}
				});
	        }
	    });
		break;
}
