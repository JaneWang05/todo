$(function(){
	var add=$('.add')    //新增
	var input=$('.header input')   //输入框
	var ul=$('.list')
	var todos=[];   //存储todo数据

	var pos;   //记录触摸的起始位置


    ul.on('touchstart','li',function(e){
		pos=e.originalEvent.changedTouches[0].clientX;
	});
	ul.on('touchend','li',function(e){
		var endPos=e.originalEvent.changedTouches[0].clientX;
		if(endPos-pos>50){
			todos[$(this).index()].state=1;
			$(this).addClass('done');
            
		}
		if(endPos-pos<-50){
		    todos[$(this).index()].state=0;
			$(this).removeClass('done');
		}
		localStorage.todos=JSON.stringify(todos);
	});
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		for (var i =0; i <todos.length; i++) {
  			var c=(todos[i].state)?'done':"";
  			var v=$.trim(input.val());
  			$("<li class='list'><div class='kuai'></div><div class='content'></div>"+v+"<div class='delete'></div></li>").appendTo(ul);
  		};
  		render();
	}	
	//添加事件  
	add.on("touchend",function(){
		var v=$.trim(input.val());
		if(!v){
			return;
		}
		var todo={
			name:v,
			state:0
		};
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos);
		render();
		input.val('');
	});
	
	//delete 删除
	ul.on('touchstart','.delete',function(){
		var li=$(this).closest('li');
		var index=li.index();
		todos.splice(index,1);
		localStorage.todos=JSON.stringify(todos);
		li.addClass('ani-delete');
		li.delay(800).queue(function(){
			$(this).remove().dequeue();
		});
	});
	//清除所有 已完成事件
	var clearall=$('.clearall');
	clearall.on('touchend',function(){
		ul.find('.done').each(function(i){
			$(this).delay(i*80).queue(function(){
				$(this).addClass('ani-delete').dequeue();
			})
		})
		var d=800+ul.find('.done').length*80;
		ul.find('.done').delay(d).queue(function(){
			ul.find('.done').remove();
			$(this).dequeue;
		});
		var newarr=[];
 	    for(var i in todos){
 		if(todos[i].state==0){
 			newarr.push(todos[i])
 		   }
 	    }
		todos=newarr;
	    localStorage.todos=JSON.stringify(todos);

	})
	
	
	
	function render(){
		ul.empty();
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state)?'done':'';
			$('<li class="'+c+'"><div class="kuai"></div><div class="content">'+todos[i].name+
			'</div><div class="delete"></div></li>').appendTo(ul);
		}
	}
	
	var divs=$(".footer div");
	divs.on('touchend',function(){
		divs.removeClass('active');
		$(this).addClass('active');
		ul.find('li').show();
		var role =$(this).attr('data-role')
		if(role==='com'){
			ul.find('li:not(.done)').hide();
		}else if(role==="re"){
			ul.find('.done').hide();
		}
	})
	
})

