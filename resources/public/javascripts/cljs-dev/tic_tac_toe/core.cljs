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
    (update-in state [:current-player] (fn [n]
      (mod (inc n) num-players))))) ;; something like that

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

(defn game-board [dimension]
  (let [gamestate (reagent/atom {
    :players ["X" "O"]
    :current-player 0
    :board-dim dimension
    :rows (square-grid nil dimension)
    :winner nil
  })]
  ;; TODO: consider wrapping actual root element in function to serve as render() analogue
  ;; Table
  ;; Should create a child component to which we can pass down the means to update state
  ;; Without explicitly passing the state around.
  ;; Could have each cell be a component, to which a function is passed
  ;; and this function will update the state to mark the board and switch the player
  (fn []
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
      (get @gamestate :rows))]])))



(defn app []
  [:div
    [:h1 "Tic-Tac-Toe!"]
    [game-board 3]])

(reagent/render [app] (js/document.querySelector "#cljs-target"))