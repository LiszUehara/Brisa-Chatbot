package ui.drawerUtils

import MainColors
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Card
import androidx.compose.material.Icon
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp

@Composable
fun DrawerOption(icon: ImageVector,text : String,onClick : () -> Unit){
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Start,
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 6.dp, top = 0.dp, end = 6.dp, bottom = 0.dp)
            .clickable {
                       onClick()
            }
        ,
        content = {
            Row(
                Modifier
                    .padding(start = 6.dp, top = 18.dp, end = 6.dp, bottom = 18.dp)
                    .fillMaxWidth()
            ){
                Row {
                    Icon(imageVector = icon,"", tint = Color(MainColors.blue))
                    Text(text,Modifier
                        .padding(start = 6.dp, top = 0.dp, end = 0.dp, bottom = 0.dp)
                    )
                }
            }
        },
    )
}