package ui.atendimento.about

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Scaffold
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import cafe.adriel.voyager.core.screen.Screen
import cafe.adriel.voyager.core.screen.ScreenKey
import org.jetbrains.compose.resources.ExperimentalResourceApi
import org.jetbrains.compose.resources.painterResource

class AboutScreen : Screen {

    override val key: ScreenKey = "Sobre o app"
    @Composable
    override fun Content() {
        About()
    }
}

@OptIn(ExperimentalResourceApi::class)
@Composable
fun About(){
    Surface {
        Box(Modifier.fillMaxSize()){
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(16.dp)
            ) {
                Image(painterResource("SeraFin.jpg"), null, contentScale = ContentScale.Crop)
                Text(text = "SeraFin")
                Text(
                    text = "O objetivo principal do aplicativo é simplificar e facilitar o exercício de sua contribuição para o município de Juazeiro do Norte",
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}