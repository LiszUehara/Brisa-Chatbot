package ui.drawerUtils

import VariantColors
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Divider
import androidx.compose.material.Icon
import androidx.compose.material.ScaffoldState
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.MailOutline
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.rounded.Phone
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.key.Key.Companion.R
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import cafe.adriel.voyager.core.annotation.InternalVoyagerApi
import cafe.adriel.voyager.navigator.Navigator
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch
import org.jetbrains.compose.resources.Resource
import org.jetbrains.compose.resources.painterResource
import ui.atendimento.about.AboutScreen
import ui.atendimento.location.LocationScreen
import ui.atendimento.phone.PhoneScreen
import ui.chat.Store
import ui.home.ChatScreen

@OptIn(InternalVoyagerApi::class)
@Composable
fun DrawerContent(
    navigator: Navigator,
    scope : CoroutineScope,
    state : ScaffoldState
){
    Column {
        Row (
            Modifier
                .fillMaxWidth()
                .clickable { scope.launch { state.drawerState.close() }
                }){
            Row (
                Modifier
                    .padding(start = 6.dp, top = 32.dp, end = 6.dp, bottom = 32.dp)
            ){
                Icon( imageVector = Icons.Filled.ArrowBack,"Back to home", tint = Color(MainColors.blue))
                Text(text = "Voltar",
                    Modifier
                        .padding(start = 6.dp, top = 0.dp, end = 0.dp, bottom = 0.dp)
                )
            }
        }

        DrawerOption(Icons.Filled.MailOutline,"Fale com Serafin") {
            navigator.push(
                ChatScreen()
            )
            scope.launch { state.drawerState.close() }
        }
        Divider(color = Color(VariantColors.lightGray), thickness = 1.dp, modifier =
        Modifier
            .padding(start = 0.dp, top = 0.dp, end = 32.dp, bottom = 0.dp)
        )
        Text(text="ATENDIMENTO", fontSize = 15.sp, modifier = Modifier.padding(start = 16.dp, top = 18.dp, end = 32.dp, bottom = 18.dp), letterSpacing = 2.sp)
        DrawerOption(Icons.Filled.LocationOn,"Rede de Atendimento"){
            navigator.push(LocationScreen())
            scope.launch { state.drawerState.close() }
        }
        DrawerOption(Icons.Rounded.Phone,"Fale Conosco / Ouvidoria"){
            navigator.push(PhoneScreen())
            scope.launch { state.drawerState.close() }
        }
        DrawerOption(Icons.Outlined.Info,"Sobre o App") {
//            navigator.dispose(AboutScreen())
            navigator.push(AboutScreen())
            scope.launch { state.drawerState.close() }
        }
    }

}