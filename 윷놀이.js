let Player_1Box_value_1 = "🐴"
let Player_2Box_value_1 = "🐷"
let Player_3Box_value_1 = "🙊"
let Player_4Box_value_1 = "🐯"


let p1_List = ["🐴", "🐴🐴", "🐴🐴🐴", "🐴🐴🐴🐴"];
let p2_List = ["🐷", "🐷🐷", "🐷🐷🐷", "🐷🐷🐷🐷"];
let p3_List = ["🙊", "🙊🙊", "🙊🙊🙊", "🙊🙊🙊🙊"];
let p4_List = ["🐯", "🐯🐯", "🐯🐯🐯", "🐯🐯🐯🐯"];

let mals_List = [
	["X","XX", "XX", "XXX", "XXXX"],
	["X","🐴", "🐴🐴", "🐴🐴🐴", "🐴🐴🐴🐴"],
	["X","🐷", "🐷🐷", "🐷🐷🐷", "🐷🐷🐷🐷"],
	["X","🙊", "🙊🙊", "🙊🙊🙊", "🙊🙊🙊🙊"],
	["X","🐯", "🐯🐯", "🐯🐯🐯", "🐯🐯🐯🐯"]
]


let P1_num = [0]; // p1시작 위치
let P2_num = [0]; // p2 시작 위치
let P3_num = [0]; // p2 시작 위치
let P4_num = [0]; // p2 시작 위치

let P1_field_MAl  = [0]; // 필드말
let P1_ready_MAl = [4]; // 남은말
let P1_end_MAl  = [0]; // end

let P2_field_MAl  = [0]; // 필드말
let P2_ready_MAl = [4]; // 남은말
let P2_end_MAl  = [0]; // end

let P3_field_MAl  = [0]; // 필드말
let P3_ready_MAl = [4];  // 남은말
let P3_end_MAl  = [0]; // end

let P4_field_MAl  = [0]; // 필드말
let P4_ready_MAl = [4]; // 남은말
let P4_end_MAl  = [0]; // end

let turn = 1; // 1이면 p1차례 2면 p2 차례


let P1_count =0;

let answer_click = false;
let end = 0;

let turn_MAl = [0];
let turn_innerText = [""];

let numList = document.querySelectorAll("#Box");

let yut = 0;

let Yut_onemore_Time = true;
let diagonal = "";

let call_diagonal_msg = "";
let call_diagonal_msg2 = "";

let turn_OnemoreTime = false;
let backdo_check = false; 

let turn_change = false; //이동 말 클릭으로 바뀌었을때
let $yut_List = []; 
let $body = document.querySelector("body");
let $turn_Msg = document.querySelector("#turn_ing");
let $totalmsg = document.querySelector("#totalmsg");
let $move = document.querySelector("#move_MAl");
let $new_Mal = document.querySelector("#new_MAl");
let $msg1=  document.querySelector("#msg1")



function end_Last(){

		 // 종료할때 꼭 바꿔야 되는 것들
	if(turn == 1){
		$turn_Msg.innerText = "🐷 턴" ;
	} else if(turn == 2){
		$turn_Msg.innerText = "🙊 턴" ;
	} else if(turn == 3){
		$turn_Msg.innerText = "🐯 턴" ;
	} else if(turn == 4){
		$turn_Msg.innerText = "🐴 턴" ;
	}

	printMAL();
	if(turn_OnemoreTime == false){
	turn++;
	} 
	if(turn == 5){
		turn = 1;
	}
	turn_change = false;

	
}

function Straight(turn_MAl,yut,turn_innerText){
	let Start_Turn_MAl =  turn_MAl[0]; // 원래 있던자리
	let end_Turn_MAl  = turn_MAl[0] + yut; // 윷던지고 다음 갈 자리


	console.log(end_Turn_MAl);
	let enemy_check = [0,0]; //end_Turn_MAl 자리에 상대말이 있는지 체크
	let MY_check = [0,0]; // end_Turn_MAl 자리에 내말이 있는지 체크
	let Now_check = [0,0]  // 내말을 업을때 내말이 몇개 있는지 체크
	let Now_check_enemy = [0,0];

	let start_check = false;
	let end_check = false;
	let Now_check_enemy_check = false;
	let start_BOX = document.querySelector(`.num${Start_Turn_MAl}`);

	let end_BOX = document.querySelector(`.num${end_Turn_MAl}`);
	console.log("누구의 턴인가 " + turn)
	console.log("end_Turn_MAl = " + end_Turn_MAl);
	let BOX_End_num = document.querySelector(`.num${end_Turn_MAl}`).innerText;
	
	let BOX_Strat_num = document.querySelector(`.num${Start_Turn_MAl}`).innerText; 
	
	

	for(let i=0; i<mals_List.length; i++){

		for(let j=0; j<mals_List[i].length; j++){
			if(BOX_End_num == mals_List[i][j] && i != turn && end_Turn_MAl < 20){
				enemy_check[0] = i;
				enemy_check[1] = j;
				end_check = true;
			}

			if(BOX_End_num == mals_List[i][j] && i == turn && end_Turn_MAl < 20){
				MY_check[0] = i;
				MY_check[1] = j;
				end_check = true;
			}

			if(BOX_Strat_num == mals_List[i][j]){
				Now_check[0] = i;
				Now_check[1] = j;
				if(j >1){
					start_check = true;
				}
			}

			if(BOX_Strat_num == mals_List[i][j]){
				Now_check_enemy[0] = i;
				Now_check_enemy[1] = j;
				if(Now_check_enemy[0] !=turn){
				Now_check_enemy_check = true;
			}
			}
		}
	}

	if(end_Turn_MAl > 20){
		$totalmsg.innerText = `${mals_List[turn][1]}말 결승선 통과!!`
		start_BOX.innerText = "";
		if(turn == 1){
			P1_field_MAl[0] -= Now_check[1];
			P1_end_MAl[0] += Now_check[1];
			P1_num[0] =0;

		} else if(turn == 2){
			P2_field_MAl[0] -=Now_check[1];
			P2_end_MAl[0] +=Now_check[1];
			P2_num[0] =0;

		} else if(turn == 3){
			P3_field_MAl[0] -=Now_check[1];
			P3_end_MAl[0] +=Now_check[1];
			P3_num[0] =0;

		} else if(turn == 4){
			P4_field_MAl[0] -=Now_check[1];
			P4_end_MAl[0] +=Now_check[1];
			P4_num[0] =0;

		}

		return;
	}

	
	
	




	if(end_check == false){ //아무것도 없음
		if(start_check == false){ //내말이 1개 일때
		if(Now_check_enemy_check == false){
		start_BOX.innerText = "";
		}
		end_BOX.innerText = turn_innerText[0];
		console.log("turn_innerText" + turn_innerText)
		} else { //내말이 2개 이상 일떄
		start_BOX.innerText = "";
		end_BOX.innerText = mals_List[Now_check[0]][Now_check[1]];
		}
	} else if(end_check){
		turn_OnemoreTime = true;
		console.log("다음턴에 뭐가 있다 일단");
		console.log("잡힐때 상대개수 확인");
		console.log("개수= " +enemy_check[1] )
		if(enemy_check[0] !=0 ){ //상대가 있다
			$totalmsg.innerText ="상대 말을 잡았습니다! 기회 +1";
			if(enemy_check[0] == 1){
				P1_num[0] =0;
				P1_field_MAl[0] -= enemy_check[1];
				P1_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 2){
				P2_num[0] =0;
				P2_field_MAl[0] -= enemy_check[1];
				P2_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 3){
				P3_num[0] =0;
				P3_field_MAl[0] -= enemy_check[1];
				P3_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 4){
				P4_num[0] =0;
				P4_field_MAl[0] -= enemy_check[1];
				P4_ready_MAl[0] += enemy_check[1];
			}
			if(start_check == false){ //내말이 1개 일때
				if(Now_check_enemy_check == false){
					start_BOX.innerText = "";
					}
				end_BOX.innerText = end_BOX.innerText = turn_innerText[0];
				} else { //내말이 2개 이상 일떄
					if(Now_check_enemy_check == false){
						start_BOX.innerText = "";
						}
				end_BOX.innerText = mals_List[Now_check[0]][Now_check[1] +MY_check[1]];
				}
		} else if(MY_check[0] !=0){ //soa
			$totalmsg.innerText ="말을 업어서  같이 갑니다!";
			if(start_check == false){ //내말이 1개 일때
				console.log("여기맞니?");
				if(Now_check_enemy_check == false){
					start_BOX.innerText = "";
					}
				end_BOX.innerText = mals_List[MY_check[0]][MY_check[1]+1];
				console.log(MY_check[0],MY_check[1]+1 )
				
				} else { //내말이 2개 이상 일떄
					console.log("2개이상일때");
					if(Now_check_enemy_check == false){
						start_BOX.innerText = "";
						}
				end_BOX.innerText = mals_List[Now_check[0]][Now_check[1]+MY_check[1]];
				}
		}
	}
	turn_MAl[0] = turn_MAl[0] + yut;
	if(turn == 1){
		P1_num[0] += yut;
	} else if(turn == 2){
		P2_num[0] += yut;
	} else if(turn == 3){
		P3_num[0] += yut;
	} else if(turn == 4){
		P4_num[0] += yut;
	}

}

function diagonal_Left(turn_MAl,yut,turn_innerText){
	let value = 30;
	let Start_Turn_MAl =  turn_MAl[0]; // 원래 있던자리
	let end_Turn_MAl  = turn_MAl[0] + yut*value; // 윷던지고 다음 갈 자리
	let temp = turn_MAl[0];
	if(yut == -1){
	temp = turn_MAl[0] + yut*value;
	}
	for(let i=0; i<yut; i++){
		temp += value;
		if(temp == 185 ){
			temp  = 15;
			value = 1;
			end_Turn_MAl = 15;	
		}
		end_Turn_MAl = temp;
	}
	
	console.log(end_Turn_MAl);
	let enemy_check = [0,0]; //end_Turn_MAl 자리에 상대말이 있는지 체크
	let MY_check = [0,0]; // end_Turn_MAl 자리에 내말이 있는지 체크
	let Now_check = [0,0]  // 내말을 업을때 내말이 몇개 있는지 체크
	let Now_check_enemy = [0,0];

	let start_check = false;
	let end_check = false;
	let Now_check_enemy_check = false;

	let start_BOX = document.querySelector(`.num${Start_Turn_MAl}`);
	
	
	let end_BOX = document.querySelector(`.num${end_Turn_MAl}`);
	console.log("누구의 턴인가 " + turn)
	console.log("end_Turn_MAl = " + end_Turn_MAl);
	let BOX_End_num = document.querySelector(`.num${end_Turn_MAl}`).innerText;
	
	let BOX_Strat_num = document.querySelector(`.num${Start_Turn_MAl}`).innerText; 
	

	for(let i=0; i<mals_List.length; i++){

		for(let j=0; j<mals_List[i].length; j++){
			if(BOX_End_num == mals_List[i][j] && i != turn && end_Turn_MAl < 20){
				enemy_check[0] = i;
				enemy_check[1] = j;
				end_check = true;
			}

			if(BOX_End_num == mals_List[i][j] && i == turn && end_Turn_MAl < 20){
				MY_check[0] = i;
				MY_check[1] = j;
				end_check = true;
			}

			if(BOX_Strat_num == mals_List[i][j]){
				Now_check[0] = i;
				Now_check[1] = j;
				if(j >1){
					start_check = true;
				}
			}

			if(BOX_Strat_num == mals_List[i][j]){
				Now_check_enemy[0] = i;
				Now_check_enemy[1] = j;
				if(Now_check_enemy[0] !=turn){
				Now_check_enemy_check = true;
			}
			}
		}
	}



	if(end_check == false){ //아무것도 없음
		if(start_check == false){ //내말이 1개 일때
		start_BOX.innerText = "";
		end_BOX.innerText = turn_innerText[0];
		console.log("아무것도 없을때 말1개" + turn_innerText + "표시할말");
		} else { //내말이 2개 이상 일떄
		start_BOX.innerText = "";
		end_BOX.innerText = mals_List[Now_check[0]][Now_check[1]];
		}
	} else if(end_check){
		turn_OnemoreTime = true;
		console.log("다음턴에 뭐가 있다 일단");
		if(enemy_check[0] !=0 ){ //상대가 있다
			if(enemy_check[0] == 1){
				P1_num[0] =0;
				P1_field_MAl[0] -= enemy_check[1];
				P1_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 2){
				P2_num[0] =0;
				P2_field_MAl[0] -= enemy_check[1];
				P2_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 3){
				P3_num[0] =0;
				P3_field_MAl[0] -= enemy_check[1];
				P3_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 4){
				P4_num[0] =0;
				P4_field_MAl[0] -= enemy_check[1];
				P4_ready_MAl[0] += enemy_check[1];
			}
			if(start_check == false){ //내말이 1개 일때
				start_BOX.innerText = "";
				end_BOX.innerText  = turn_innerText[0];
				} else { //내말이 2개 이상 일떄
				start_BOX.innerText = "";
				end_BOX.innerText = mals_List[Now_check[0]][Now_check[1] +MY_check[1]];
				}
		} else if(MY_check[0] !=0){ //soa
			if(start_check == false){ //내말이 1개 일때
				console.log("여기맞니?  내말 1개일때");
				start_BOX.innerText = "";
				end_BOX.innerText = mals_List[MY_check[0]][MY_check[1]+1];
				console.log(MY_check[0],MY_check[1]+1)
				
				} else { //내말이 2개 이상 일떄
					console.log("2개이상일때");
				start_BOX.innerText = "";
				end_BOX.innerText = mals_List[Now_check[0]][Now_check[1]+MY_check[1]];
				}
		}
	}
	turn_MAl[0] = temp;
	if(turn == 1){
		P1_num[0] = temp;
	} else if(turn == 2){
		P2_num[0] += temp;
	} else if(turn == 3){
		P3_num[0] += temp;
	} else if(turn == 4){
		P4_num[0] += temp;
	}

}

function diagonal_right(turn_MAl,yut,turn_innerText){
	
	let value = 5;
	let Start_Turn_MAl =  turn_MAl[0]; // 원래 있던자리
	let end_Turn_MAl  = turn_MAl[0] + yut*value; // 윷던지고 다음 갈 자리
	let temp = turn_MAl[0];
	if(yut == -1){
		temp = turn_MAl[0] + yut*value;
	}

	if(yut == -1 && turn_MAl[0] == 80 ){
		Start_Turn_MAl = turn_MAl[0] 
	}
	
	for(let i=0; i<yut; i++){
		temp += value;
		end_Turn_MAl = temp;
		
	}
	
	let start_BOX = document.querySelector(`.num${Start_Turn_MAl}`);

	let end_BOX = document.querySelector(`.num${end_Turn_MAl}`);
	console.log("누구의 턴인가 " + turn)
	console.log("end_Turn_MAl = " + end_Turn_MAl);
	let BOX_End_num = document.querySelector(`.num${end_Turn_MAl}`).innerText;
	
	let BOX_Strat_num = document.querySelector(`.num${Start_Turn_MAl}`).innerText; 
	
	console.log(end_Turn_MAl);
	let enemy_check = [0,0]; //end_Turn_MAl 자리에 상대말이 있는지 체크
	let MY_check = [0,0]; // end_Turn_MAl 자리에 내말이 있는지 체크
	let Now_check = [0,0]  // 내말을 업을때 내말이 몇개 있는지 체크
	let Now_check_enemy = [0,0];

	let start_check = false;
	let end_check = false;
	let Now_check_enemy_check = false;

	for(let i=0; i<mals_List.length; i++){

		for(let j=0; j<mals_List[i].length; j++){
			if(BOX_End_num == mals_List[i][j] && i != turn && end_Turn_MAl < 20){
				enemy_check[0] = i;
				enemy_check[1] = j;
				end_check = true;
			}

			if(BOX_End_num == mals_List[i][j] && i == turn && end_Turn_MAl < 20){
				MY_check[0] = i;
				MY_check[1] = j;
				end_check = true;
			}

			if(BOX_Strat_num == mals_List[i][j]){
				Now_check[0] = i;
				Now_check[1] = j;
				if(j >1){
					start_check = true;
				}
			}

			if(BOX_Strat_num == mals_List[i][j]){
				Now_check_enemy[0] = i;
				Now_check_enemy[1] = j;
				if(Now_check_enemy[0] !=turn){
				Now_check_enemy_check = true;
			}
			}
		}
	}


	if(end_Turn_MAl > 110){
		$totalmsg.innerText = `${mals_List[turn][1]}말 결승선 통과!!`
		start_BOX.innerText = "";
		if(turn == 1){
			P1_field_MAl[0] -=Now_check[1];
			P1_end_MAl[0] +=Now_check[1];
			P1_num[0] =0;

		} else if(turn == 2){
			P2_field_MAl[0] -=Now_check[1];
			P2_end_MAl[0] +=Now_check[1];
			P2_num[0] =0;

		} else if(turn == 3){
			P3_field_MAl[0] -=Now_check[1];
			P3_end_MAl[0] +=Now_check[1];
			P3_num[0] =0;

		} else if(turn == 4){
			P4_field_MAl[0] -=Now_check[1];
			P4_end_MAl[0] +=Now_check[1];
			P4_num[0] =0;

		}

		return;
	}




	
	



	if(end_check == false){ //아무것도 없음
		if(start_check == false){ //내말이 1개 일때
		start_BOX.innerText = "";
		end_BOX.innerText = turn_innerText[0];
		} else { //내말이 2개 이상 일떄
		start_BOX.innerText = "";
		end_BOX.innerText = mals_List[Now_check[0]][Now_check[1]];
		}
	} else if(end_check){
		turn_OnemoreTime = true;
		console.log("다음턴에 뭐가 있다 일단");
		if(enemy_check[0] !=0 ){ //상대가 있다
			if(enemy_check[0] == 1){
				P1_num[0] =0;
				P1_field_MAl[0] -= enemy_check[1];
				P1_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 2){
				P2_num[0] =0;
				P2_field_MAl[0] -= enemy_check[1];
				P2_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 3){
				P3_num[0] =0;
				P3_field_MAl[0] -= enemy_check[1];
				P3_ready_MAl[0] += enemy_check[1];
			} else if(enemy_check[0] == 4){
				P4_num[0] =0;
				P4_field_MAl[0] -= enemy_check[1];
				P4_ready_MAl[0] += enemy_check[1];
			}
			if(start_check == false){ //내말이 1개 일때
				start_BOX.innerText = "";
				end_BOX.innerText = end_BOX.innerText = turn_innerText[0];
				} else { //내말이 2개 이상 일떄
				start_BOX.innerText = "";
				end_BOX.innerText = mals_List[Now_check[0]][Now_check[1] +MY_check[1]];
				}
		} else if(MY_check[0] !=0){ //soa
			if(start_check == false){ //내말이 1개 일때
				console.log("여기맞니?");
				start_BOX.innerText = "";
				end_BOX.innerText = mals_List[MY_check[0]][MY_check[1]+1];
				console.log(MY_check[0],MY_check[1]+1 )
				
				} else { //내말이 2개 이상 일떄
					console.log("2개이상일때");
				start_BOX.innerText = "";
				end_BOX.innerText = mals_List[Now_check[0]][Now_check[1]+MY_check[1]];
				}
		}
	}
	turn_MAl[0] = temp;
	if(turn == 1){
		P1_num[0] = temp;
	} else if(turn == 2){
		P2_num[0] += temp;
	} else if(turn == 3){
		P3_num[0] += temp;
	} else if(turn == 4){
		P4_num[0] += temp;
	}

	
}


function NEW(){
	if(turn == 1){
		if(P1_field_MAl[0] > 0 && P1_ready_MAl[0] != 0){
			turn_MAl[0] = 0;
			P1_num[0] =0;
			P1_ready_MAl[0]--;
			P1_field_MAl[0]++;
		} else {
			alert("새로나올 말이 없습니다");
		}
	} else if(turn == 2){
		if(P2_field_MAl[0] > 0 && P2_ready_MAl[0] != 0){
			turn_MAl[0] = 0;
			P2_num[0] =0;
			P2_ready_MAl[0]--;
			P2_field_MAl[0]++;
		} else {
			alert("새로나올 말이 없습니다");
		}
	} else if(turn == 3){
		if(P3_field_MAl[0] > 0 && P3_ready_MAl[0] != 0){
			turn_MAl[0] = 0;
			P3_num[0] =0;
			P3_ready_MAl[0]--;
			P3_field_MAl[0]++;
			
		} else {
			alert("새로나올 말이 없습니다");
		}
	} else if(turn == 4){
		if(P4_field_MAl[0] > 0 && P4_ready_MAl[0] != 0){
			turn_MAl[0] = 0;
			P4_num[0] =0;
			P4_ready_MAl[0]--;
			P4_field_MAl[0]++;
			
		} else {
			alert("새로나올 말이 없습니다");
		}
	}
	printMAL();
	
	$new_Mal.removeEventListener("click",NEW);
	$new_Mal.style.cursor = "default";
}

function check_MAlS(){
	
		if(turn == 1){
			turn_MAl[0] = P1_num[0];
			turn_innerText[0] = "🐴";
			if(P1_field_MAl[0] == 0){
				P1_field_MAl[0]++;
				P1_ready_MAl[0]--;
			}

		} else if(turn == 2){
			turn_MAl[0] = P2_num[0];
			turn_innerText[0] = "🐷";
			if(P2_field_MAl[0] == 0){
				P2_field_MAl[0]++;
				P2_ready_MAl[0]--;
			}
			
		} else if(turn == 3){
			turn_MAl[0] = P3_num[0];
			turn_innerText[0] = "🙊";
			if(P3_field_MAl[0] == 0){
				P3_field_MAl[0]++;
				P3_ready_MAl[0]--;
			}
			
		} else if(turn == 4){
			turn_MAl[0] = P4_num[0];
			turn_innerText[0] = "🐯";
			if(P4_field_MAl[0] == 0){
				P4_field_MAl[0]++;
				P4_ready_MAl[0]--;
			}
	}
	console.log(turn_MAl);
}

function call_diagonal(){
	call_diagonal_msg = "";
	call_diagonal_msg = prompt("대각선 이동 y / n");
}

function call_diagonal2(){
	call_diagonal_msg2 = "";
	call_diagonal_msg2 = prompt("왼쪽, 오른쪽 < / > 중에 입력" );
}
function move(){

	if(turn_MAl[0] == 80){
		turn_MAl = 10;
	} 
	if(turn >= 5){
		turn = 1;
	}
	if(turn == 1){
		if(P1_field_MAl[0] == 0 && yut == -1){
		turn++;
		turn_innerText[0] = "🐷";
		$totalmsg.innerText = `이런 ${turn_innerText[0]}님 빽도가 나왔습니다. 한턴 쉬어가세요.`;
		P1_num[0] = 0;
		turn_MAl[0] = 0;
		$turn_Msg.innerText = "🐷 턴" ;
		return;
		} 
	
	} else if(turn == 2){
		if(P2_field_MAl[0] == 0 && yut == -1){
		turn++; 
		turn_innerText[0] = "🙊";
		$totalmsg.innerText = `이런 ${turn_innerText[0]}님 빽도가 나왔습니다. 한턴 쉬어가세요.`;
		P2_num[0] = 0;
		turn_MAl[0] = 0;
		$turn_Msg.innerText = "🙊 턴" ;
		return;
		}
		
	} else if(turn == 3){
		if(P3_field_MAl[0] == 0 && yut == -1){
		turn++; 
		turn_innerText[0] = "🐯";
		$totalmsg.innerText = `이런 ${turn_innerText[0]}님 빽도가 나왔습니다. 한턴 쉬어가세요.`;
		P3_num[0] = 0;
		turn_MAl[0] = 0;
		$turn_Msg.innerText = "🐯 턴" ;
		return;
		}
		
	} else if(turn == 4){
		if(P4_field_MAl[0] == 0 && yut == -1){
		turn++; 
		$totalmsg.innerText = `이런 ${turn_innerText[0]}님 빽도가 나왔습니다. 한턴 쉬어가세요.`;
		P4_num[0] = 0;
		turn_MAl[0] = 0;
		$turn_Msg.innerText = "🐴 턴" ;
		return;
		}
		
	}
	check_MAlS();

	
	
	if(turn_MAl[0] == 5 ){
		call_diagonal();
		if(call_diagonal_msg == "y" && yut !=-1 ){
			diagonal_Left(turn_MAl,yut,turn_innerText);
			console.log("30대각선 들어왔는지 확인");
		} else {
			Straight(turn_MAl,yut,turn_innerText);
		}

	} else if(turn_MAl[0] == 35 || turn_MAl[0] == 65 ||  turn_MAl[0] == 125 || turn_MAl[0] == 155 ){
		diagonal_Left(turn_MAl,yut,turn_innerText);
	} else if(turn_MAl[0] == 10){
		call_diagonal();
		if(call_diagonal_msg == "y" && yut != -1){
			turn_MAl[0] = 80;
			diagonal_right(turn_MAl,yut,turn_innerText);
			console.log("5대각선 들어왔는지 확인");
		} else {
			Straight(turn_MAl,yut,turn_innerText);
			
		}
 	} else if(turn_MAl[0] == 85 || turn_MAl[0] == 90 || turn_MAl[0] == 100 || turn_MAl[0] == 105 ){
		diagonal_right(turn_MAl,yut,turn_innerText);
	} else if(turn_MAl[0] == 95){
		call_diagonal2();
		
		if(call_diagonal_msg2 == "<" ){
			diagonal_Left(turn_MAl,yut,turn_innerText);
			
		} else {
			diagonal_right(turn_MAl,yut,turn_innerText);
		}
 	} else {

		Straight(turn_MAl,yut,turn_innerText);
		if(backdo_check){
			if(turn ==1 && turn_MAl[0] == 0){
				P1_num[0] = 20;
			} else if(turn ==2 && turn_MAl[0] == 0){
				P2_num[0] = 20;
			} else if(turn ==3 && turn_MAl[0] == 0){
				P3_num[0] = 20;
			} else if(turn ==4 && turn_MAl[0] == 0){
				P4_num[0] = 20;
			}
			turn_MAl[0] = 20;
		}
	}

	



	if(turn_OnemoreTime == false){
		end_Last();
	}
	$move.removeEventListener("click",move);
	$move.style.cursor = "default";

	console.log("p1= " +P1_num);
	console.log("p2= " +P2_num);
	console.log("p3= " +P3_num);
	console.log("p4= " +P4_num);

	console.log("p1필드말= " +P1_field_MAl);
	console.log("p2필드말= " +P2_field_MAl);
	console.log("p3필드말= " +P3_field_MAl);
	console.log("p4필드말= " +P4_field_MAl);

	console.log("p1준비말= " +P1_ready_MAl);
	console.log("p2준비말= " +P2_ready_MAl);
	console.log("p3준비말= " +P3_ready_MAl);
	console.log("p4준비말= " +P4_ready_MAl);



}

function choice(){

	turn_change = true;
	let numList = document.querySelectorAll("#Box");
	console.log("이동말클릭");
	for(let i=0; i<numList.length; i++){
		
		for(let j=turn; j<turn+1; j++){
		
			for(k=1; k<mals_List[j].length; k++){
				
				if(numList[i].innerText == mals_List[j][k]){
					numList[i].addEventListener("click", Eventclick);
					numList[i].style.cursor = "pointer";
					}
			}
		}
	}
}

function Eventclick(e){
	
	let calssNames = e.target.classList.value;
	console.log(calssNames);
	let number = Number(calssNames.split("num")[1]);
	console.log("클릭 넘버는"+number);
	if(turn == 1){
		P1_num[0] = number;
	} else if (turn ==2 ){
		P2_num[0] = number;
	} else if (turn ==3 ){
		P3_num[0] = number;
	} else if (turn ==4 ){
		P4_num[0] = number;
	}
	turn_MAl[0] = number;
	
	console.log("turn = " +turn);

	for(let i=1; i<numList.length; i++){
	
		for(let j=turn; j<turn+1; j++){

			for(k=1; k<mals_List[j].length; k++){
				if(numList[i].innerText == mals_List[j][k]){
					numList[i].removeEventListener("click", Eventclick);
					numList[i].style.cursor = "default";
					}
			}
		}
	}
}

function Yutnori(){
	backdo_check = false;
	$totalmsg.innerText = "";
	turn_OnemoreTime = false;
	
	yut = 1;
	console.log("윷 굴리는중");
	if(Yut_onemore_Time){
    let yut_setting = ["도", "도", "도", "도", "개", "개", "개", "개", "개", "개", "걸", "걸", "걸", "걸","윷","모"];
    let size = yut_setting.length;
    let temp = 0;
    for(let i=0; i<100; i++){
        let r = Math.floor(Math.random()*size);
        temp = yut_setting[0];
        yut_setting[0] = yut_setting[r];
        yut_setting[r] = temp;
    }

    let backdo_setting = ["도","빽도","도","도"];
    let size_backdo = backdo_setting.length;
    
 
	let r1 = Math.floor(Math.random()*yut_setting.length);	

		console.log("정제전 "+yut_setting[r1]);
    if(yut_setting[r1] == "도"){
      
		let r2 =  Math.floor(Math.random()*size_backdo);
	
		$msg1.innerText = "도 를 뽑았습니다."
        if(backdo_setting[r2] == "빽도"){
            yut  -= 2;
			backdo_check = true;
			console.log("빽도 들어왔을때 계산후 반응");
			$msg1.innerText = "빽도!! 한칸 뒤로갑니다."
        } 
    } else if(yut_setting[r1] == "개"){
        yut = 2;
		$msg1.innerText = "개 를 뽑았습니다."
    } else if(yut_setting[r1] == "걸"){
        yut = 3;
		$msg1.innerText = "걸 를 뽑았습니다."
    } else if(yut_setting[r1] == "윷"){
        yut = 4;
		$msg1.innerText = "윷 를 뽑았습니다. 한번더!"
		turn_OnemoreTime = true;
    } else if(yut_setting[r1] == "모"){
        yut = 5;
		$msg1.innerText = "모 를 뽑았습니다. 한번더!"
		turn_OnemoreTime = true;
    }
	$move.addEventListener("click", move);
	$move.style.cursor = "pointer";
	
	console.log("최종"+yut);
	

	if(turn == 1){
		if(P1_field_MAl[0] > 0 && P1_ready_MAl[0] > 0){
			$new_Mal.addEventListener("click", NEW);
			$new_Mal.style.cursor = "pointer";
		}
	} else if(turn == 2){
		if(P2_field_MAl[0] > 0 && P2_ready_MAl[0] >= 0){
			$new_Mal.addEventListener("click", NEW);
			$new_Mal.style.cursor = "pointer";
		}
	} else if(turn == 3){
		if(P3_field_MAl[0] > 0 && P3_ready_MAl[0] > 0){
			$new_Mal.addEventListener("click", NEW);
			$new_Mal.style.cursor = "pointer";

		}
	} else if(turn == 4){
		if(P4_field_MAl[0] > 0 && P4_ready_MAl[0] > 0){
			$new_Mal.addEventListener("click", NEW);
			$new_Mal.style.cursor = "pointer";
		}
	}
}
}

function printMAL(){
	let P1_BOX = document.querySelector(".p1");
	let P2_BOX = document.querySelector(".p2");
	let P3_BOX = document.querySelector(".p3");
	let P4_BOX = document.querySelector(".p4");

	P1_BOX.innerText = "";
	P2_BOX.innerText = "";
	P3_BOX.innerText = "";
	P4_BOX.innerText = "";

	let P11_BOX = document.querySelector(".p11");
	let P22_BOX = document.querySelector(".p22");
	let P33_BOX = document.querySelector(".p33");
	let P44_BOX = document.querySelector(".p44");

	P11_BOX.innerText = "";
	P22_BOX.innerText = "";
	P33_BOX.innerText = "";
	P44_BOX.innerText = "";
	
	//출발할 수 있는 말이 몇마리 인지
	for(let i=0; i<P1_ready_MAl[0]; i++){
		P1_BOX.innerText += "🐴";
	}
	for(let i=0; i<P2_ready_MAl[0]; i++){
		P2_BOX.innerText += "🐷";
	}
	for(let i=0; i<P3_ready_MAl[0]; i++){
		P3_BOX.innerText += "🙊";
	}
	for(let i=0; i<P4_ready_MAl[0]; i++){
		P4_BOX.innerText += "🐯";
	}

	//나가는 말이 몇마리 인지
	for(let i=0; i<P1_end_MAl[0]; i++){
		P11_BOX.innerText += "🐴";
	}
	for(let i=0; i<P2_end_MAl[0]; i++){
		P22_BOX.innerText += "🐷";
	}
	for(let i=0; i<P3_end_MAl[0]; i++){
		P33_BOX.innerText += "🙊";
	}
	for(let i=0; i<P4_end_MAl[0]; i++){
		P44_BOX.innerText += "🐯";
	}

	if(turn == 1){
		$turn_Msg.innerText = "🐷 턴" ;
	} else if(turn == 2){
		$turn_Msg.innerText = "🙊 턴" ;
	} else if(turn == 3){
		$turn_Msg.innerText = "🐯 턴" ;
	} else if(turn == 4){
		$turn_Msg.innerText = "🐴 턴" ;
	}

}

function init(){
	
	$turn_Msg.innerText = "🐴 턴" ;
}
init();