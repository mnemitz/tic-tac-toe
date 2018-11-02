// Compiled by ClojureScript 1.10.339 {}
goog.provide('tic_tac_toe.core');
goog.require('cljs.core');
goog.require('reagent.core');
tic_tac_toe.core.square = (function tic_tac_toe$core$square(i){
return (i * i);
});
tic_tac_toe.core.square_grid = (function tic_tac_toe$core$square_grid(s,dimension){
return cljs.core.vec.call(null,cljs.core.replicate.call(null,dimension,cljs.core.vec.call(null,cljs.core.replicate.call(null,dimension,s))));
});
tic_tac_toe.core.mark_board = (function tic_tac_toe$core$mark_board(i1,i2){
return (function (state){
console.log(i1,i2);

var mark = cljs.core.nth.call(null,cljs.core.get.call(null,state,new cljs.core.Keyword(null,"players","players",-1361554569)),cljs.core.get.call(null,state,new cljs.core.Keyword(null,"current-player","current-player",-970625153)));
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rows","rows",850049680),i1,i2], null),((function (mark){
return (function (_){
return mark;
});})(mark))
);
});
});
tic_tac_toe.core.switch_player = (function tic_tac_toe$core$switch_player(state){
var num_players = cljs.core.count.call(null,cljs.core.get.call(null,state,new cljs.core.Keyword(null,"players","players",-1361554569)));
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-player","current-player",-970625153)], null),((function (num_players){
return (function (n){
return cljs.core.mod.call(null,(n + (1)),num_players);
});})(num_players))
);
});
tic_tac_toe.core.make_move = (function tic_tac_toe$core$make_move(i1,i2,state){
return (function (){
return cljs.core.swap_BANG_.call(null,state,(function (s){
console.log("swapping");

return tic_tac_toe.core.switch_player.call(null,tic_tac_toe.core.mark_board.call(null,i1,i2).call(null,cljs.core.deref.call(null,state)));
}));
});
});
tic_tac_toe.core.game_cell = (function tic_tac_toe$core$game_cell(state,i1,i2,value){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"cell-container"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"cell",new cljs.core.Keyword(null,"on-click","on-click",1632826543),((cljs.core.not.call(null,value))?tic_tac_toe.core.make_move.call(null,i1,i2,state):null)], null),value], null)], null);
});
tic_tac_toe.core.game_board = (function tic_tac_toe$core$game_board(dimension){
var gamestate = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"players","players",-1361554569),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["X","O"], null),new cljs.core.Keyword(null,"current-player","current-player",-970625153),(0),new cljs.core.Keyword(null,"board-dim","board-dim",-1922177592),dimension,new cljs.core.Keyword(null,"rows","rows",850049680),tic_tac_toe.core.square_grid.call(null,null,dimension),new cljs.core.Keyword(null,"winner","winner",714604679),null], null));
return ((function (gamestate){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),cljs.core.map_indexed.call(null,((function (gamestate){
return (function (r_idx,row){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),cljs.core.map_indexed.call(null,((function (gamestate){
return (function (c_idx,cell){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(function (){var G__1243 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [r_idx,c_idx], null);
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),G__1243)){
return null;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null),G__1243)){
return "vert";
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(2)], null),G__1243)){
return null;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0)], null),G__1243)){
return "hori";
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(1)], null),G__1243)){
return "vert hori";
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(2)], null),G__1243)){
return "hori";
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),(0)], null),G__1243)){
return null;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),(1)], null),G__1243)){
return "vert";
} else {
if(cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),(2)], null),G__1243)){
return null;
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__1243)].join('')));

}
}
}
}
}
}
}
}
}
})()], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [tic_tac_toe.core.game_cell,gamestate,r_idx,c_idx,cell], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),c_idx], null));
});})(gamestate))
,row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),r_idx], null));
});})(gamestate))
,cljs.core.get.call(null,cljs.core.deref.call(null,gamestate),new cljs.core.Keyword(null,"rows","rows",850049680)))], null)], null);
});
;})(gamestate))
});
tic_tac_toe.core.app = (function tic_tac_toe$core$app(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Tic-Tac-Toe!"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tic_tac_toe.core.game_board,(3)], null)], null);
});
reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tic_tac_toe.core.app], null),document.querySelector("#cljs-target"));

//# sourceMappingURL=core.js.map
