(ns tic-tac-toe.core
  (:require [reagent.core :as reagent]))

(defn square [i] (* i i))

(defn square-grid [s dimension]
  (vec (replicate dimension (vec (replicate dimension s)))))


(defn mark-board [i1 i2]
  (fn [state]
    (.log js/console i1 i2)
    (let [mark (nth (get state :players) (get state :current-player))]
      (update-in state [:rows i1 i2] (fn [_] mark)))))


(defn switch-player [state]
  (let [num-players (count (get state :players))]
    (update-in state [:current-player]
      #(mod (inc %) num-players)))) ;; something like that

;; Replace cell in state with new value
(defn make-move [i1 i2 state]
  #(swap! state (fn [s]
    (.log js/console "swapping")
    (switch-player ((mark-board i1 i2) @state)))))


;; value passed as prop
;; Onclick must deref state, switching the value
;; Unless there already exists a value
(defn game-cell [state i1 i2 value]
  [:div {:class "cell-container"}
    [:a {:class "cell" :on-click (if (not value) (make-move i1 i2 state))} value]])

;; check if whole row is won
;; check if all rows contain x or o at position n
;; check if each row contains x or o at an incrementing index
;; could just hash each cell according to player
;; appending to the list


;; winning board types:
;; Vertical). 3 possibilities
;; Horizontal). 3 possibilities
;; Diagonal). 2 possibilities

;; ((X X X) (- - -) (- - -))
;; ((- - -) (X X X) (- - -))
;; ((- - -) (- - -) (X X X))
;; ((X - -) (X - -) (X - -))


;; 4 possible options for what could "happen next" at any time:
;;  1). Open:  both players have certain possible moves which could advance the game to a win
;;          - iff
;;            - The set of X's possible moves intersects with X's possible wins
;;           AND
;;            - The set of O's possible moves intersects with O's possible wins
;;  2). Player X has won
;;        - iff The set of O's possible moves is disjoint from O's possible wins
;;  3). Player O has won
;;        - iff The set of X's possible moves is disjoint from X's possible wins
;;  4). Draw:
;;        - iff (2) and (3) are simultaneously true

;; ^ where 'moves' is understood to be a sequence of moves

;; Both X and O's possible wins are initially all 8 winning combinations
;; As each move is made, 

(defn vertical-wins [board-dim]
  (vals (group-by #(mod % board-dim) (range (* board-dim board-dim)))))

(defn horizontal-wins [board-dim]
  (vals (group-by #(quot % board-dim) (range (* board-dim board-dim)))))

(defn diagonal-wins [board-dim]
  [ (vec (map #(* (+ board-dim 1) %) (range board-dim)))
    (vec (map #(* (- board-dim 1) %) (range board-dim)))])

;; we want all horizontal, vertical, and diagonal minimal wins in a single list
(defn get-winning-combos [board-dim]
  (concat
    (vertical-wins board-dim)
    (horizontal-wins board-dim)
    (diagonal-wins board-dim)))


(defn game-board [dimension]
  (let [gamestate (reagent/atom {
    :players ["X" "O"]
    :current-player 0
    :board-dim dimension
    :rows (square-grid nil dimension)
    :winning-combos nil
  })]
  ;; Create our get-winner function, which will be informed by initially computing all winning combinations
  ;; This lets us bake one function which we can call later without redoing that work
  (def check-for-winner 
    (let [winning-combos (get-winning-combos dimension)]
      #(println winning-combos)))

    ;; ^^^ TODO
    ;; want to iterate through all combos,
    ;; checking each one to see if they are all populated with the same actual value
    ;; First combination which does should let us return the value contained
  
  ;; Table
  ;; Should create a child component to which we can pass down the means to update state
  ;; Without explicitly passing the state around.
  ;; Could have each cell be a component, to which a function is passed
  ;; and this function will update the state to mark the board and switch the player
  (fn []
    (check-for-winner)
    [:div {}
      [:table
        [:tbody
          (map-indexed (fn [r_idx row]
            ^{:key r_idx}
            ;; Table row, CSS classes hard coded to n=3 for now for simplicity
            ;; Could extract this to a more comprehensive function,
            ;; for arbitrary dimensions
            [:tr
              (map-indexed (fn [c_idx cell]
                ^{:key c_idx}
                [:td {:class  (case [r_idx c_idx]
                        [0 0] nil
                        [0 1] "vert"
                        [0 2] nil
                        [1 0] "hori"
                        [1 1] "vert hori"
                        [1 2] "hori"
                        [2 0] nil
                        [2 1] "vert"
                        [2 2] nil
                      )}
                  [game-cell gamestate r_idx c_idx cell]])
                row)])
      (get @gamestate :rows))]]])))



(defn app []
  [:div
    [:h1 "Tic-Tac-Toe!"]
    [game-board 3]])

(reagent/render [app] (js/document.querySelector "#cljs-target"))