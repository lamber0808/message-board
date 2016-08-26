/**
 * Created by an.han on 14-2-20.
 */


window.onload = function () {
    ///*获取ul*/
    //var list = document.getElementById('list');
    ///*获取ul下面的li标签*/
    //var boxs = list.children;
    var timer;
    var $boxs = $(".box")

    //格式化日期
    function formateDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        m = m > 9 ? m : '0' + m;
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
    }


    function reply(el){
        var $praiseBox = $(el).parent().parent().find(".comment-list")
        var $textArea = $(el).siblings(".comment");
        var $textVal = $textArea.val()
        var str = '<div class="comment-box clearfix" user="self">' +
                    '<img class="myhead" src="images/my.jpg" alt="">' +
                    '<div class="comment-content">' +
                    '<p class="comment-text"><span class="user">我：</span>'+$textVal+'</p>' +
                    '<p class="comment-time">' +
                     formateDate(new Date())+
                    '<a href="javascript:;" class="comment-praise" total="1" my="0" style="display: inline-block">1 赞</a>' +
                    '<a href="javascript:;" class="comment-operate">删除</a>' +
                    '</p>' +
                    '</div>' +
                  '</div>'
        $praiseBox.before(str)
        $textArea.val("")
        textArea.trigger('blur')
    }
    //赞回复
    function praiseReply(el){
        var oldTotal =  parseInt($(el).attr('total'));
        var my = parseInt($(el).attr('my'))
        var newTotal;
        if(my==0){
            newTotal = 1+oldTotal;
            $(el).attr('my',1)
            $(el).attr('total',newTotal)
            $(el).html(newTotal+" 取消赞")
            //$(el).attr('my',0);
            //$(el).attr('total',total-1)
            //$(el).html(total-1+" 赞")
        }else{
            newTotal = oldTotal-1;
            $(el).attr('my',0)
            $(el).attr('total',newTotal)
            $(el).html(newTotal+" 赞")
            //$(el).attr('my',1);
            //my = parseInt($(el).attr('my'))
            //$(el).html(my+total +" 取消赞")
            //$(el).attr('total',my+total)
        }
    }
    /*删除留言*/
    function operate(el){
        var $parentNode = $(el).parent().parent().parent();
        var user = $parentNode.find('.user').html()
        var $textArea = $parentNode.parent().parent().find('.comment')
        if($(el).html()=="删除"){
            $parentNode.remove()
        }else{
            $textArea.trigger('focus')
            $textArea.val('回复'+user)
            $textArea.trigger('keyup')
        }
    }
    function praiseBox (el){
        var $praisesTotal = $(el).parent().parent().find(".praises-total")
        var txt = $(el).html();
        var oldTotal = parseInt($praisesTotal.attr("total"))
        var newTotal;
        if(txt=='赞'){
            newTotal = oldTotal+1;
            $praisesTotal.attr("total",newTotal)
            $praisesTotal[0].innerHTML = (newTotal==1)?"我觉得好赞":'我和'+oldTotal+'个人觉得好赞'
            $(el).html('取消赞')
        }else{
            newTotal = oldTotal-1;
            $praisesTotal.attr('total',newTotal);
            $praisesTotal[0].innerHTML = (newTotal==0)?'':newTotal+'觉得好赞'
            $(el).html('赞')
        }

    }
    $boxs.on("click",function (e) {
           var el  = e.target;
           var $cla = $(el).attr("class")
           switch ($cla){
               //关闭分享
               case "close":
                   $(this).remove()
                   break;
               //赞分享
               case 'praise':
                   praiseBox(el)
                   break;
               //按键回复
               case 'btn':
                   reply(el)
                   break;
               //赞留言
               case 'comment-praise':
                   praiseReply(el)
                   break;
               //删除留言
               case 'comment-operate':
                   operate(el);
                   break;
           }
    })
    var textArea = $boxs.find(".comment");
    textArea.on({"focus":function(){
        $(this).parent().addClass("text-box-on")
        var input = $(this)[0]
        input.value =  input.value == '评论…' ? '' : input.value;
        $(this).trigger("keyup")
    },"blur": function () {
        var $me = $(this)
        if($me.val()==""){
            setTimeout(function () {
                $me.parent().removeClass("text-box-on")
                var input = $me[0]
                input.value =  input.value == '' ? '评论…' : input.value;
            },200)
        }

    },"keyup":function(){
        var len = $(this).val().length;
        var btn = $(this).siblings("button")
        var word = $(".word").html(len+"/140")
        if(len==0||len>140){
            btn.addClass("btn-off")
        }else{
            btn.removeClass("btn-off")
        }
    }})
};

