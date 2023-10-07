package ui.home

import MainColors
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Create
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import cafe.adriel.voyager.core.screen.Screen
import cafe.adriel.voyager.core.screen.ScreenKey
import cafe.adriel.voyager.navigator.LocalNavigator
import cafe.adriel.voyager.navigator.currentOrThrow
import model.MenuItem

object ItemsScreen : Screen{

    override val key: ScreenKey = "Inicio"

    @Composable
    override fun Content() {
        ProductsList()
    }

    @Composable
    fun ProductsList() {

        val data2 = listOf<String>("oi","dois")
        val data = listOf<MenuItem>(
//            MenuItem("Imprimir Boleto"),
            MenuItem("Imprimir Boleto",MainColors.green),
            MenuItem("Segunda via",MainColors.yellow),
            MenuItem("Consultar algo",MainColors.blue),
            MenuItem("Outros",MainColors.lightBlue),
        )
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.Top,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            RenderData(data)
        }
    }

    @OptIn(ExperimentalAnimationApi::class)
    @Composable
    fun RenderData(data : List<MenuItem>) {
        val navigator = LocalNavigator.currentOrThrow
        val isClicked = remember{
            mutableStateOf(false)
        }
        LazyColumn(
            state = rememberLazyListState(),
            contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 0.dp, bottom = 8.dp),
            modifier = Modifier.fillMaxSize()

        ) {

            items(items= data, key = { it.data.hashCode()}) { dataItem->
                Item(dataItem= dataItem,state= isClicked, onItemClicked = {
                    navigator.push(ItemsDetails(dataItem.data))
                })
            }
        }
    }

    @OptIn(ExperimentalMaterialApi::class)
    @Composable
    fun Item(
        dataItem: MenuItem,
        state : MutableState<Boolean>,
        onItemClicked: () -> Unit
    ){
        val colors = mutableListOf<Color>(Color.Green,Color.Yellow,Color.Blue)
        Column {
            Spacer(modifier = Modifier.height(30.dp))
            Card(
                backgroundColor = Color(dataItem.color),
                elevation = 10.dp,
                contentColor = colors.random(),
                modifier = Modifier.fillMaxWidth()

                    //prevent double click
                    .clickable { if(state.value){
                        return@clickable
                    }else {
                        onItemClicked()
                    }
                        state.value = true
                    }
                ,
                shape = RoundedCornerShape(10.dp),
                )
            {
                Row (
                    modifier = Modifier.fillMaxSize()
                        .padding(32.dp),
                    horizontalArrangement =Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,

                    ){
                    Column(
                        verticalArrangement = Arrangement.Top,
                        horizontalAlignment = Alignment.Start
                    ) {
                        Text(
                            text = dataItem.data,
                            color = Color.White,
                            fontWeight = FontWeight(400)
                        )
                        Text(
                            text = dataItem.data,
                            color = Color.White
                        )
                    }
                    Image(
                        modifier = Modifier.size(48.dp),
                        imageVector = Icons.Filled.Create,
                        contentDescription ="Image from",
                        alpha = 0.3f
                    )
                }

            }
        }

    }


}